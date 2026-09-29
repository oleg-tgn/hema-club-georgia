"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import useEmblaCarousel from "embla-carousel-react";
import ArrowIcon from "../icons/ArrowIcon";
import CloseIcon from "../icons/CloseIcon";

export type GalleryImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  caption: string;
};

const lightboxButtonClasses =
  "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent";

function Lightbox({
  photos,
  startIndex,
}: {
  photos: GalleryImage[];
  startIndex: number;
}) {
  const t = useTranslations("Gallery");
  const [viewportRef, emblaApi] = useEmblaCarousel({
    startIndex,
    duration: 20,
  });
  const [selected, setSelected] = useState(startIndex);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") scrollPrev();
    if (event.key === "ArrowRight") scrollNext();
  };

  const caption = photos[selected]?.caption;

  return (
    <div className="flex h-full flex-col" onKeyDown={onKeyDown}>
      <div className="flex items-center justify-between p-3 sm:p-5">
        <span className="text-sm font-medium text-white/70 tabular-nums">
          {t("counter", { current: selected + 1, total: photos.length })}
        </span>
        <Dialog.Close className={lightboxButtonClasses} aria-label={t("close")}>
          <CloseIcon className="h-4 w-4" />
        </Dialog.Close>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="h-full overflow-hidden" ref={viewportRef}>
          <div className="flex h-full">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative h-full min-w-0 flex-[0_0_100%] px-3 sm:px-20"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={photo.url}
                    alt={photo.caption}
                    fill
                    sizes="100vw"
                    priority={index === startIndex}
                    className="object-contain select-none"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          disabled={selected === 0}
          aria-label={t("previous")}
          className={`${lightboxButtonClasses} absolute top-1/2 left-5 hidden -translate-y-1/2 sm:flex`}
        >
          <ArrowIcon direction="left" className="h-8 w-8" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={selected === photos.length - 1}
          aria-label={t("next")}
          className={`${lightboxButtonClasses} absolute top-1/2 right-5 hidden -translate-y-1/2 sm:flex`}
        >
          <ArrowIcon direction="right" className="h-8 w-8" />
        </button>
      </div>

      <p className="min-h-16 px-3 py-5 text-center text-base text-white/80 sm:px-5">
        {caption}
      </p>
    </div>
  );
}

export default function PhotoGallery({
  photos,
  title,
}: {
  photos: GalleryImage[];
  title: string;
}) {
  const t = useTranslations("Gallery");
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <>
      <div className="columns-2 gap-2 sm:gap-3 lg:columns-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => {
              setStartIndex(index);
              setOpen(true);
            }}
            aria-label={t("openPhoto", { index: index + 1 })}
            className="group mb-2 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg sm:mb-3"
          >
            <Image
              src={photo.url}
              alt={photo.caption}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/90 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0">
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Lightbox photos={photos} startIndex={startIndex} />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
