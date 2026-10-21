export function startAnchorScroll(hash, behavior = 'smooth') {
  const target = document.getElementById(hash.slice(1));
  if (target) {
    window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 80), behavior });
  }
  return () => {};
}
