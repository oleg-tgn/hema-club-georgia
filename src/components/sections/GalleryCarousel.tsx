"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Heading from "../ui/Heading";
import {
  Carousel,
  CarouselViewport,
  CarouselTrack,
  CarouselPrevButton,
  CarouselNextButton,
} from "../ui/Carousel";

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

const buttonClassName =
  "w-10 h-10 rounded-full border border-black/40 flex items-center justify-center disabled:opacity-30 cursor-pointer";

export default function GalleryCarousel({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  const t = useTranslations("Gallery");

  return (
    <Carousel options={{ loop: false, align: "start" }}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-4">
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
          <CarouselPrevButton
            aria-label={t("previous")}
            className={buttonClassName}
          />
          <CarouselNextButton
            aria-label={t("next")}
            className={buttonClassName}
          />
        </div>
      </div>

      <CarouselViewport className="full-bleed-inset w-screen ml-[calc(50%-50vw)] overflow-hidden">
        <CarouselTrack className="flex gap-3">
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
        </CarouselTrack>
      </CarouselViewport>
    </Carousel>
  );
}
