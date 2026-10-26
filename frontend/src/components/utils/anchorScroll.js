export function startAnchorScroll(hash, behavior = 'smooth') {
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return () => {}; }
  if (!id) return () => {};

  let frameId;
  let stopped = false;
  let previousTop;
  let stableFrames = 0;
  const startedAt = window.performance.now();
  const interactionEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  const cancel = () => {
    stopped = true;
    window.cancelAnimationFrame(frameId);
    interactionEvents.forEach(type => window.removeEventListener(type, cancel));
  };
  const measure = () => {
    if (stopped) return;
    // The services track changes page height after mounting. Measure the
    // document position until it settles, rather than scrolling to stale geometry.
    const target = document.getElementById(id);
    if (target && document.fonts?.status !== 'loading') {
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 80);
      stableFrames = previousTop !== undefined && Math.abs(top - previousTop) < 1 ? stableFrames + 1 : 0;
      previousTop = top;
      if (stableFrames >= 3) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        cancel();
        window.scrollTo({ top, behavior: reducedMotion ? 'instant' : behavior });
        return;
      }
    } else {
      previousTop = undefined;
      stableFrames = 0;
    }
    // Do not keep an unresolved anchor alive indefinitely or override user input.
    if (window.performance.now() - startedAt >= 4000) { cancel(); return; }
    frameId = window.requestAnimationFrame(measure);
  };
  interactionEvents.forEach(type => window.addEventListener(type, cancel, { passive: true }));
  frameId = window.requestAnimationFrame(measure);
  return cancel;
}
