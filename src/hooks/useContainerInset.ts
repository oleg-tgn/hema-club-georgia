"use client";

import { useLayoutEffect, useRef, useState } from "react";

// Measures the distance from the true viewport edge to the left edge of the
// returned ref's element. Used by full-bleed carousels: a normal-flow probe
// element sits at the same x-position as the page's content container, and
// its measured offset becomes the leading space inside an edge-to-edge
// carousel track, so the first slide looks container-aligned at rest even
// though the track itself scrolls all the way to the viewport edge.
export function useContainerInset<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inset, setInset] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setInset(el.getBoundingClientRect().left);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, inset };
}
