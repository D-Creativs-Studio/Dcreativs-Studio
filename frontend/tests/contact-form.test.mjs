import test from 'node:test';
import assert from 'node:assert/strict';
import { getContactStepError } from '../src/data/contactForm.js';

const brief = {
  name: 'Ada Example',
  company: '',
  selectedServices: ['Web & Platform Engineering'],
  budget: 'Flexible / Undecided',
  timeline: 'Exploratory stage',
  message: 'A new portfolio for an independent design studio.',
  email: 'ada@example.com',
  phone: '',
  website_trap: '',
};

test('requires a name and a project brief, rejecting whitespace', () => {
  assert.match(getContactStepError(1, { ...brief, name: '   ' }), /name/i);
  assert.match(
    getContactStepError(6, { ...brief, message: '\n ' }),
    /project/i
  );
});

test('requires service, budget, and timeline selections', () => {
  assert.match(
    getContactStepError(3, { ...brief, selectedServices: [] }),
    /service/i
  );
  assert.match(getContactStepError(4, { ...brief, budget: '' }), /budget/i);
  assert.match(getContactStepError(5, { ...brief, timeline: '' }), /timeline/i);
});

test('accepts a complete enquiry with optional company and phone omitted', () => {
  for (let step = 1; step <= 7; step += 1) {
    assert.equal(getContactStepError(step, brief), '');
  }
});

test('accepts multiple selected services without changing the answers', () => {
  const data = {
    ...brief,
    selectedServices: ['Brand Identity & Strategy', 'UI/UX & Product Design'],
  };
  const original = structuredClone(data);
  assert.equal(getContactStepError(3, data), '');
  assert.deepEqual(data, original);
});

test('rejects malformed emails before the final submission', () => {
  for (const email of [
    '',
    'ada',
    'ada@',
    'ada@example',
    'ada name@example.com',
    'ada@@example.com',
  ]) {
    assert.match(getContactStepError(7, { ...brief, email }), /email/i, email);
  }
});

test('accepts trimmed emails and plus-addressing', () => {
  assert.equal(
    getContactStepError(7, { ...brief, email: '  ada+studio@example.co.uk  ' }),
    ''
  );
});
