"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
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

export function CarouselViewport({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { viewportRef } = useCarouselContext();
  return (
    <div className={className} ref={viewportRef}>
      {children}
    </div>
  );
}

export function CarouselTrack({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function CarouselArrowIcon({
  className,
  direction,
}: {
  className?: string;
  direction: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
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

export function CarouselPrevButton({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const { scrollPrev, canScrollPrev } = useCarouselContext();
  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={className}
      {...props}
    >
      {children ?? <CarouselArrowIcon direction="left" className="w-4 h-4" />}
    </button>
  );
}

export function CarouselNextButton({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const { scrollNext, canScrollNext } = useCarouselContext();
  return (
    <button
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={className}
      {...props}
    >
      {children ?? <CarouselArrowIcon direction="right" className="w-4 h-4" />}
    </button>
  );
}
