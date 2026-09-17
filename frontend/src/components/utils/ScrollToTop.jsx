import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - navOffset);
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToHash()) {
        // Retry shortly after DOM render
        const t1 = setTimeout(scrollToHash, 100);
        const t2 = setTimeout(scrollToHash, 300);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
