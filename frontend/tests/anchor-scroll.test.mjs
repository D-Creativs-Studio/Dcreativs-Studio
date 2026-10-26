import test from 'node:test';
import assert from 'node:assert/strict';
import { startAnchorScroll } from '../src/components/utils/anchorScroll.js';

function page(t, { top = 2000, present = true, reducedMotion = false } = {}) {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const frames = new Map();
  const events = new Map();
  const calls = [];
  let sequence = 0;
  let now = 0;
  const state = { top, present, id: 'contact' };
  globalThis.window = {
    scrollY: 0,
    performance: { now: () => now },
    requestAnimationFrame(callback) { const id = ++sequence; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
    addEventListener(type, listener) { events.set(type, listener); },
    removeEventListener(type) { events.delete(type); },
    matchMedia() { return { matches: reducedMotion }; },
    scrollTo(options) { calls.push(options); },
  };
  globalThis.document = {
    fonts: { status: 'loaded' },
    getElementById(id) { return id === state.id && state.present ? { getBoundingClientRect: () => ({ top: state.top }) } : null; },
  };
  t.after(() => { globalThis.window = originalWindow; globalThis.document = originalDocument; });
  return {
    state, calls, frames, events,
    frame() { now += 16; const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback(now)); },
    advance(count) { for (let i = 0; i < count; i += 1) this.frame(); },
  };
}

test('cross-page contact navigation waits for changing section geometry, then jumps once', t => {
  const view = page(t);
  startAnchorScroll('#contact', 'instant');
  assert.deepEqual(view.calls, []);
  view.frame();
  view.state.top = 6000; // Services calculates its horizontal-scroll height after mounting.
  view.frame();
  view.state.top = 6400;
  view.advance(5);
  assert.deepEqual(view.calls, [{ top: 6320, behavior: 'instant' }]);
  assert.equal(view.frames.size, 0);
});

test('About-to-team navigation uses the final team position after the services track expands', t => {
  const view = page(t, { top: 1800 });
  view.state.id = 'team';
  startAnchorScroll('#team', 'instant');
  view.frame();
  view.state.top = 6200;
  view.frame();
  view.state.top = 6800;
  view.advance(5);
  assert.deepEqual(view.calls, [{ top: 6720, behavior: 'instant' }]);
  assert.equal(view.events.size, 0);
});

test('finds a section that mounts after the old 300ms retry window', t => {
  const view = page(t, { present: false });
  startAnchorScroll('#contact', 'instant');
  view.advance(30);
  view.state.present = true;
  view.advance(5);
  assert.deepEqual(view.calls, [{ top: 1920, behavior: 'instant' }]);
});

test('waits for loading fonts before choosing the destination', t => {
  const view = page(t);
  document.fonts.status = 'loading';
  startAnchorScroll('#contact');
  view.advance(5);
  assert.deepEqual(view.calls, []);
  document.fonts.status = 'loaded';
  view.state.top = 2500;
  view.advance(5);
  assert.deepEqual(view.calls, [{ top: 2420, behavior: 'smooth' }]);
});

test('route cleanup and manual scrolling cancel pending anchor navigation', t => {
  const view = page(t);
  const cancel = startAnchorScroll('#contact');
  cancel();
  view.advance(5);
  assert.deepEqual(view.calls, []);
  startAnchorScroll('#contact');
  view.events.get('wheel')?.();
  view.advance(5);
  assert.deepEqual(view.calls, []);
  assert.equal(view.events.size, 0);
});

test('missing anchors stop retrying and reduced-motion users get an immediate jump', t => {
  const view = page(t, { present: false, reducedMotion: true });
  startAnchorScroll('#contact');
  view.advance(260);
  assert.equal(view.frames.size, 0);
  assert.equal(view.events.size, 0);
  view.state.present = true;
  startAnchorScroll('#contact');
  view.advance(5);
  assert.deepEqual(view.calls, [{ top: 1920, behavior: 'instant' }]);
});
