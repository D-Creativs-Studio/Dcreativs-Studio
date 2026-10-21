import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { initialContactForm } from '../src/data/contactForm.js';

// Render the real components without opening a browser or contacting the API.
const server = await createServer({
  configFile: false,
  root: fileURLToPath(new URL('../', import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) },
  },
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
});
after(() => server.close());
const { ContactFormStep } = await server.ssrLoadModule(
  '/src/components/contact/ContactFormStep.jsx'
);
const { ContactPage } = await server.ssrLoadModule(
  '/src/pages/ContactPage.jsx'
);

function elements(node, type) {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node))
    return node.flatMap((child) => elements(child, type));
  return [
    ...(node.type === type ? [node] : []),
    ...elements(node.props?.children, type),
  ];
}

test('initial page renders an identified form, current step, and direct email alternative', () => {
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: ['/contact'] },
      createElement(ContactPage)
    )
  );
  assert.match(html, /<form[^>]+aria-labelledby="contact-step-title"/);
  assert.match(html, /Step <strong>1<\/strong> of 7/);
  assert.equal((html.match(/aria-current="step"/g) || []).length, 1);
  assert.match(html, /href="mailto:dcreativs.studio@gmail.com"/);
  assert.match(html, /<label for="contact-name">Your full name<\/label>/);
});

test('development confirmation preview shows a sample brief without a submission form', () => {
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: ['/contact?preview=confirmation'] },
      createElement(ContactPage)
    )
  );
  assert.match(html, /Your brief is ready/);
  assert.match(html, /No email has been sent/);
  assert.match(html, /Selected services/);
  assert.match(html, /UI\/UX &amp; Product Design/);
  assert.doesNotMatch(html, /<form/);
});

test('all seven steps render their correct input controls and retain entered values', () => {
  const data = {
    ...initialContactForm,
    name: 'Ada Example',
    company: 'Example Studio',
    message: 'An accessible portfolio.',
    email: 'ada@example.com',
    phone: '+234 123456789',
  };
  const expected = [
    ['name', 'Ada Example'],
    ['company', 'Example Studio'],
    ['selectedServices', 'Web &amp; Platform Engineering'],
    ['budget', '$15,000+'],
    ['timeline', 'Exploratory stage'],
    ['message', 'An accessible portfolio.'],
    ['email', 'ada@example.com'],
  ];
  for (let step = 1; step <= 7; step += 1) {
    const html = renderToStaticMarkup(
      createElement(ContactFormStep, { step, data, onChange() {}, error: '' })
    );
    assert.ok(
      html.includes(`name="${expected[step - 1][0]}"`),
      `step ${step} control`
    );
    assert.ok(html.includes(expected[step - 1][1]), `step ${step} value`);
    assert.ok(html.includes('data-step-focus'), `step ${step} keyboard target`);
  }
});

test('service controls add and remove choices without changing the source answers', () => {
  let change;
  const data = {
    ...initialContactForm,
    selectedServices: ['Web & Platform Engineering'],
  };
  const tree = ContactFormStep({
    step: 3,
    data,
    onChange: (...args) => {
      change = args;
    },
    error: '',
  });
  const inputs = elements(tree, 'input');
  inputs
    .find((input) => input.props.value === 'Brand Identity & Strategy')
    .props.onChange();
  assert.deepEqual(change, [
    'selectedServices',
    ['Web & Platform Engineering', 'Brand Identity & Strategy'],
  ]);
  inputs
    .find((input) => input.props.value === 'Web & Platform Engineering')
    .props.onChange();
  assert.deepEqual(change, ['selectedServices', []]);
  assert.deepEqual(data.selectedServices, ['Web & Platform Engineering']);
});

test('budget and timeline controls use single-choice semantics and emit the chosen value', () => {
  for (const [step, field, value] of [
    [4, 'budget', 'Flexible / Undecided'],
    [5, 'timeline', 'Exploratory stage'],
  ]) {
    let change;
    const tree = ContactFormStep({
      step,
      data: initialContactForm,
      onChange: (...args) => {
        change = args;
      },
      error: '',
    });
    const input = elements(tree, 'input').find(
      (element) => element.props.value === value
    );
    assert.equal(input.props.type, 'radio');
    input.props.onChange();
    assert.deepEqual(change, [field, value]);
  }
});

test('invalid inputs expose their error while company and phone stay optional', () => {
  const name = ContactFormStep({
    step: 1,
    data: initialContactForm,
    onChange() {},
    error: 'Please enter your name.',
  });
  const nameInput = elements(name, 'input')[0];
  assert.equal(nameInput.props['aria-invalid'], true);
  assert.match(nameInput.props['aria-describedby'], /contact-error/);
  assert.equal(nameInput.props.required, true);
  const company = ContactFormStep({
    step: 2,
    data: initialContactForm,
    onChange() {},
    error: '',
  });
  assert.equal(elements(company, 'input')[0].props.required, false);
  const contact = ContactFormStep({
    step: 7,
    data: initialContactForm,
    onChange() {},
    error: '',
  });
  assert.equal(
    elements(contact, 'input').find((input) => input.props.name === 'email')
      .props.required,
    true
  );
  assert.ok(
    !elements(contact, 'input').find((input) => input.props.name === 'phone')
      .props.required
  );
});
