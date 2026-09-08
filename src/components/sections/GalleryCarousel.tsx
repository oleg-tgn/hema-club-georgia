"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useContainerInset } from "@/hooks/useContainerInset";
import Heading from "../ui/Heading";

const INSTAGRAM_URL = "#";

export type GalleryPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  caption?: string | null;
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({
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

export default function GalleryCarousel({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  const t = useTranslations("Gallery");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const { ref: insetRef, inset } = useContainerInset<HTMLDivElement>();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div
        ref={insetRef}
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-4"
      >
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="justify-self-start flex items-center gap-2 text-sm"
        >
          <InstagramIcon className="w-6 h-6" />
          {t("instagramCta")}
        </a>

        <Heading size="lg" as="h2" className="justify-self-center">
          {t("title")}
        </Heading>

        <div className="justify-self-end flex gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label={t("previous")}
            className="w-10 h-10 rounded-full border border-current flex items-center justify-center"
          >
            <ArrowIcon direction="left" className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label={t("next")}
            className="w-10 h-10 rounded-full border border-current flex items-center justify-center"
          >
            <ArrowIcon direction="right" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className="w-screen ml-[calc(50%-50vw)] overflow-hidden"
        style={{ paddingLeft: inset, paddingRight: inset }}
        ref={emblaRef}
      >
        <div className="flex gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="h-168 rounded-lg overflow-hidden flex-none"
            >
              <Image
                src={photo.src}
                alt={photo.caption || ""}
                width={photo.width}
                height={photo.height}
                className="h-full w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
