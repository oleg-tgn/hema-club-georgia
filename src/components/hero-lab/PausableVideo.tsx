"use client";

import { useEffect, useRef, useState } from "react";

// Looping muted video that pauses/resumes on click anywhere on it. The icon
// shows on hover and stays while paused, so a stopped video reads as
// stopped rather than broken. Starts paused for prefers-reduced-motion.
export default function PausableVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
    }
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? "Play video" : "Pause video"}
      aria-pressed={paused}
      className="group relative block h-full w-full cursor-pointer"
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />
      <span
        className={`absolute top-1/2 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
          paused ? "opacity-100" : "opacity-0"
        }`}
      >
        {paused ? (
          <svg viewBox="0 0 24 24" className="ml-1 size-7" aria-hidden>
            <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" />
          </svg>
        )}
      </span>
    </button>
  );
}
