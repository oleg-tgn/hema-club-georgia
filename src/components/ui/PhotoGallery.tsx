"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image, { getImageProps } from "next/image";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import ArrowIcon from "../icons/ArrowIcon";

export type GalleryImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  caption: string;
};

// Screen-sized variants come from Next's optimizer (same URLs next/image
// would use); the untouched original goes last so zooming in can reach
// full detail instead of upscaling a screen-sized copy.
function toSlide({ url, width, height, caption }: GalleryImage): SlideImage {
  const { props } = getImageProps({
    src: url,
    width,
    height,
    alt: caption,
    sizes: "100vw",
  });

  const optimized = (props.srcSet ?? "")
    .split(", ")
    .map((entry) => {
      const [src, descriptor] = entry.split(" ");
      const w = parseInt(descriptor, 10);
      return { src, width: w, height: Math.round((height * w) / width) };
    })
    .filter((source) => source.src && source.width < width);

  return {
    src: url,
    width,
    height,
    alt: caption,
    description: caption || undefined,
    srcSet: [...optimized, { src: url, width, height }],
  };
}

export default function PhotoGallery({
  photos,
  title,
}: {
  photos: GalleryImage[];
  title: string;
}) {
  const t = useTranslations("Gallery");
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="columns-2 gap-2 sm:gap-3 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t("openPhoto", { index: i + 1 })}
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

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map(toSlide)}
        plugins={[Captions, Counter, Zoom]}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
        captions={{ descriptionTextAlign: "center" }}
        controller={{ closeOnBackdropClick: true }}
        // Circled arrows in the site's style; the circle itself is drawn in
        // globals.css (.gallery-lightbox).
        className="gallery-lightbox"
        render={{
          iconPrev: () => <ArrowIcon direction="left" className="h-8 w-8" />,
          iconNext: () => <ArrowIcon direction="right" className="h-8 w-8" />,
        }}
        labels={{
          Lightbox: title,
          "Photo gallery": title,
          Previous: t("previous"),
          Next: t("next"),
          Close: t("close"),
          "Zoom in": t("zoomIn"),
          "Zoom out": t("zoomOut"),
        }}
      />
    </>
  );
}
