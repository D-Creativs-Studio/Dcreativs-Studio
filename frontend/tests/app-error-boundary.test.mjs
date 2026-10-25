import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

const server = await createServer({
  configFile: false,
  cacheDir: 'node_modules/.vite-tests',
  root: fileURLToPath(new URL('../', import.meta.url)),
  plugins: [react()],
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
});
after(() => server.close());
const { AppErrorBoundary } = await server.ssrLoadModule('/src/components/common/AppErrorBoundary.jsx');

function elements(node, type) {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node)) return node.flatMap(child => elements(child, type));
  return [...(node.type === type ? [node] : []), ...elements(node.props?.children, type)];
}

test('healthy app content passes through untouched', () => {
  const child = { content: 'healthy app' };
  const boundary = new AppErrorBoundary({ children: child });
  assert.equal(boundary.render(), child);
});

test('crash fallback has accessible recovery controls and needs no router', () => {
  const boundary = new AppErrorBoundary({ children: null });
  boundary.state = AppErrorBoundary.getDerivedStateFromError(new Error('private crash detail'));
  const tree = boundary.render();
  const html = renderToStaticMarkup(tree);
  assert.match(html, /role="alert" aria-labelledby="app-error-heading"/);
  assert.match(html, /Something went wrong/);
  assert.doesNotMatch(html, /private crash detail/);
  assert.equal(elements(tree, 'a').find(link => link.props.children === 'Back to home').props.href, '/');
  assert.match(html, /href="mailto:dcreativs.studio@gmail.com"/);
});

test('reload requests a fresh page and the error hook focuses the heading', () => {
  const boundary = new AppErrorBoundary({ children: null });
  boundary.state = { hasError: true };
  const previousWindow = globalThis.window;
  const previousError = console.error;
  let reloaded = false;
  let focused = false;
  let reported;
  try {
    globalThis.window = { location: { reload() { reloaded = true; } } };
    console.error = (...args) => { reported = args; };
    boundary.headingRef.current = { focus() { focused = true; } };
    elements(boundary.render(), 'button')[0].props.onClick();
    assert.equal(reloaded, true);
    const error = new Error('render failed');
    const info = { componentStack: 'Example component' };
    boundary.componentDidCatch(error, info);
    assert.equal(focused, true);
    assert.deepEqual(reported, ['Application render error:', error, info]);
  } finally {
    globalThis.window = previousWindow;
    console.error = previousError;
  }
});
