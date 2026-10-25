import test from 'node:test';
import assert from 'node:assert/strict';
import { getContactErrors, initialContactForm } from '../src/data/contactForm.js';
import { sendContactEnquiry } from '../src/lib/contactSubmission.js';

const enquiry = {
  ...initialContactForm,
  name: 'Ada Example',
  email: 'ada@example.com',
  selectedServices: ['Website & Web App Development'],
  message: 'A website to explain my services and receive enquiries.',
};

test('a short enquiry is valid without budget, timeline, company, or phone', () => {
  assert.deepEqual(getContactErrors(enquiry), {});
});

test('validation identifies each missing essential field', () => {
  const errors = getContactErrors({ ...initialContactForm, name: ' ', message: '\n' });
  assert.deepEqual(Object.keys(errors), ['name', 'email', 'selectedServices', 'message']);
  for (const email of ['ada', 'ada@', 'ada@example', 'ada@@example.com', 'ada name@example.com']) {
    assert.ok(getContactErrors({ ...enquiry, email }).email);
  }
  assert.deepEqual(getContactErrors({ ...enquiry, email: ' ada+studio@example.co.uk ' }), {});
});

test('visitors can choose not sure yet and enter a budget in their own currency', () => {
  const data = { ...enquiry, selectedServices: ['Not sure yet'], budget: 'NGN 500000', timeline: 'To discuss' };
  const original = structuredClone(data);
  assert.deepEqual(getContactErrors(data), {});
  assert.deepEqual(data, original);
  assert.ok(getContactErrors({ ...data, selectedServices: ['Unknown option'] }).selectedServices);
});

test('submission preserves the API payload and empty optional fields', async () => {
  let request;
  const result = await sendContactEnquiry(enquiry, async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ success: true, clientConfirmation: 'sent' }) };
  });
  assert.equal(request.url, '/api/contact');
  assert.equal(request.options.method, 'POST');
  assert.deepEqual(JSON.parse(request.options.body), enquiry);
  assert.equal(result.success, true);
});

test('failed, rate-limited, malformed, and offline submissions are not reported as success', async () => {
  await assert.rejects(sendContactEnquiry(enquiry, async () => ({ ok: false, json: async () => ({ error: 'Too many submissions' }) })), /Too many submissions/);
  await assert.rejects(sendContactEnquiry(enquiry, async () => ({ ok: true, json: async () => ({}) })), /couldn’t send/);
  await assert.rejects(sendContactEnquiry(enquiry, async () => ({ ok: false, json: async () => { throw new SyntaxError('not JSON'); } })), /couldn’t send/);
  await assert.rejects(sendContactEnquiry(enquiry, async () => { throw new Error('Offline'); }), /Offline/);
});
