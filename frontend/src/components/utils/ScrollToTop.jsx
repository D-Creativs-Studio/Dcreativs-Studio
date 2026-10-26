import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { startAnchorScroll } from "./anchorScroll";

export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    const changedPage = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (hash) {
      // Cross-page navigation should land at the destination after layout
      // settles; same-page section navigation can keep its smooth movement.
      return startAnchorScroll(hash, changedPage ? "instant" : "smooth");
    } else {
      // Override global smooth scrolling when entering a new page.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToTop;
