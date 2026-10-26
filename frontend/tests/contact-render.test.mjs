import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { initialContactForm } from '../src/data/contactForm.js';

const server = await createServer({
  configFile: false, cacheDir: 'node_modules/.vite-tests',
  root: fileURLToPath(new URL('../', import.meta.url)),
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) } },
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] },
});
after(() => server.close());
const { ContactEnquiryFields } = await server.ssrLoadModule('/src/components/contact/ContactEnquiryFields.jsx');
const { ContactPage } = await server.ssrLoadModule('/src/pages/ContactPage.jsx');
const { ContactConfirmation } = await server.ssrLoadModule('/src/components/contact/ContactConfirmation.jsx');
function elements(node, type) {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node)) return node.flatMap(child => elements(child, type));
  return [...(node.type === type ? [node] : []), ...elements(node.props?.children, type)];
}
function renderPage(path) {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, createElement(ContactPage)));
}

test('initial page shows one short form with all essentials and a direct email alternative', () => {
  const html = renderPage('/contact');
  assert.equal((html.match(/<form\b/g) || []).length, 1);
  assert.match(html, /aria-labelledby="contact-form-heading"/);
  for (const name of ['name', 'email', 'selectedServices', 'message']) assert.ok(html.includes(`name="${name}"`));
  assert.match(html, /Send enquiry/);
  assert.match(html, /href="mailto:dcreativs.studio@gmail.com"/);
  assert.doesNotMatch(html, /We review your enquiry and follow up by email/);
  assert.doesNotMatch(html, /Step <strong>|contact-progress-track|<canvas|\$3,000|contact-artwork|<select/);
});

test('only four fields are required and additional details are collapsed by default', () => {
  const tree = ContactEnquiryFields({ data: initialContactForm, onChange() {}, errors: {} });
  const controls = [...elements(tree, 'input'), ...elements(tree, 'select'), ...elements(tree, 'textarea')];
  assert.deepEqual(controls.filter(control => control.props.required).map(control => control.props.name).sort(), ['email', 'message', 'name', 'selectedServices']);
  for (const name of ['budget', 'timeline', 'company', 'phone']) assert.ok(!controls.find(control => control.props.name === name).props.required);
  assert.equal(elements(tree, 'details')[0].props.open, undefined);
  const trap = controls.find(control => control.props.name === 'website_trap');
  assert.equal(trap.props.hidden, true);
  assert.equal(trap.props.tabIndex, -1);
});

test('each field retains its value and emits edits, including an undecided service', () => {
  let change;
  const data = { ...initialContactForm, name: 'Ada Example', email: 'ada@example.com', budget: 'NGN 500000' };
  const tree = ContactEnquiryFields({ data, onChange: (...args) => { change = args; }, errors: {} });
  assert.equal(elements(tree, 'input').find(control => control.props.name === 'budget').props.value, 'NGN 500000');
  const services = elements(tree, 'input').filter(control => control.props.name === 'selectedServices');
  assert.ok(services.every(control => control.props.type === 'radio'));
  services.find(control => control.props.value === 'Not sure yet').props.onChange();
  assert.deepEqual(change, ['selectedServices', ['Not sure yet']]);
  elements(tree, 'textarea')[0].props.onChange({ target: { value: 'An online store.' } });
  assert.deepEqual(change, ['message', 'An online store.']);
  assert.equal(data.message, '');
});

test('validation messages identify their own fields without marking other controls invalid', () => {
  const tree = ContactEnquiryFields({ data: initialContactForm, onChange() {}, errors: { email: 'Please enter a valid email address.' } });
  const email = elements(tree, 'input').find(control => control.props.name === 'email');
  assert.equal(email.props['aria-invalid'], true);
  assert.equal(email.props['aria-describedby'], 'contact-email-error');
  assert.equal(elements(tree, 'input').find(control => control.props.name === 'name').props['aria-invalid'], false);
  assert.match(renderToStaticMarkup(tree), /id="contact-email-error"/);
});

test('confirmation handles omitted budget and timeline without empty receipt values', () => {
  const html = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(ContactConfirmation, {
    data: { ...initialContactForm, name: 'Ada', email: 'ada@example.com', selectedServices: ['Not sure yet'] }, simulated: false,
  })));
  assert.match(html, /Enquiry received/);
  assert.equal((html.match(/To discuss/g) || []).length, 2);
  assert.match(html, /ada@example.com/);
});

test('development confirmation preview cannot send a form', () => {
  const html = renderPage('/contact?preview=confirmation');
  assert.match(html, /Your enquiry is ready/);
  assert.match(html, /No email has been sent/);
  assert.doesNotMatch(html, /<form/);
});
