"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type CarouselContextValue = {
  viewportRef: ReturnType<typeof useEmblaCarousel>[0];
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error(
      "Carousel components must be used within a <Carousel> parent",
    );
  }
  return ctx;
}

export function Carousel({
  options,
  className,
  children,
}: {
  options?: EmblaOptionsType;
  className?: string;
  children: ReactNode;
}) {
  const [viewportRef, emblaApi] = useEmblaCarousel(options);
  const [, forceRender] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onChange = () => forceRender((n) => n + 1);
    emblaApi.on("reInit", onChange).on("select", onChange);

    return () => {
      emblaApi.off("reInit", onChange).off("select", onChange);
    };
  }, [emblaApi]);

  return (
    <CarouselContext.Provider
      value={{
        viewportRef,
        canScrollPrev: !!emblaApi?.canScrollPrev(),
        canScrollNext: !!emblaApi?.canScrollNext(),
        scrollPrev,
        scrollNext,
      }}
    >
      <div className={className}>{children}</div>
    </CarouselContext.Provider>
  );
}

export function CarouselViewport({ children }: { children: ReactNode }) {
  const { viewportRef } = useCarouselContext();
  return (
    <div
      className="full-bleed-inset w-screen ml-[calc(50%-50vw)] overflow-hidden"
      ref={viewportRef}
    >
      {children}
    </div>
  );
}

function CarouselArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const carouselButtonClassName =
  "w-10 h-10 rounded-full border border-black/40 flex items-center justify-center disabled:opacity-30 hover:bg-night/5 cursor-pointer";

export function CarouselControls({ className }: { className?: string }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarouselContext();
  return (
    <div className={`flex gap-3 ${className ?? ""}`.trim()}>
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={carouselButtonClassName}
        aria-label="Previous"
      >
        <CarouselArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={carouselButtonClassName}
        aria-label="Next"
      >
        <CarouselArrowIcon direction="right" />
      </button>
    </div>
  );
}
