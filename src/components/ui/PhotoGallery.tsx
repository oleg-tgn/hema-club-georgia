"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image, { getImageProps } from "next/image";
import { MasonryPhotoAlbum } from "react-photo-album";
import SSR from "react-photo-album/ssr";
import "react-photo-album/masonry.css";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import ArrowIcon from "../icons/ArrowIcon";
import CloseIcon from "../icons/CloseIcon";
import ZoomIcon from "../icons/ZoomIcon";

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

// Album breakpoints are container widths, not viewport widths; these
// roughly track Tailwind's sm / lg with the page padding taken off.
const BREAKPOINTS = [600, 960] as const;

// Album width per viewport, mirroring Container (max-w-384 and its
// px-3 / sm:px-5 / md:px-10). The album turns this into each photo's
// `sizes`, taking columns and gaps into account.
const ALBUM_SIZES = {
  size: "calc(100vw - 24px)",
  sizes: [
    { viewport: "(min-width: 1536px)", size: "1456px" },
    { viewport: "(min-width: 768px)", size: "calc(100vw - 80px)" },
    { viewport: "(min-width: 640px)", size: "calc(100vw - 40px)" },
  ],
};

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
      {/* Masonry fills the shortest column next, so the order reads across
          rows (CSS columns would read down each column). SSR renders every
          breakpoint and lets container queries pick one - no layout jump
          on hydration. */}
      <SSR breakpoints={BREAKPOINTS}>
        <MasonryPhotoAlbum
          photos={photos.map((photo, i) => ({
            ...photo,
            key: photo.id,
            src: photo.url,
            alt: photo.caption,
            label: t("openPhoto", { index: i + 1 }),
          }))}
          columns={(width) => (width < BREAKPOINTS[1] ? 2 : 3)}
          spacing={(width) => (width < BREAKPOINTS[0] ? 8 : 12)}
          sizes={ALBUM_SIZES}
          onClick={({ index }) => setIndex(index)}
          componentsProps={{
            button: {
              // `!` because the library's unlayered `cursor: pointer` beats
              // Tailwind's layered utilities
              className:
                "group block w-full cursor-zoom-in! overflow-hidden rounded-lg",
            },
          }}
          render={{
            // The first row is the LCP. Keep it lazy anyway: SSR renders a
            // hidden copy per breakpoint, and eager would fetch all of them.
            image: ({ alt, title, sizes }, { photo, index }) => (
              <Image
                src={photo.url}
                alt={alt ?? ""}
                title={title}
                width={photo.width}
                height={photo.height}
                sizes={sizes}
                fetchPriority={index < 3 ? "high" : undefined}
                className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ),
          }}
        />
      </SSR>

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
        // globals.css (.gallery-lightbox). Toolbar icons share the arrows'
        // line weight but stay unframed - they're secondary.
        className="gallery-lightbox"
        render={{
          iconPrev: () => <ArrowIcon direction="left" className="h-8 w-8" />,
          iconNext: () => <ArrowIcon direction="right" className="h-8 w-8" />,
          iconClose: () => (
            <CloseIcon className="size-4.5" strokeWidth={1.78} />
          ),
          iconZoomIn: () => <ZoomIcon direction="in" className="h-8 w-8" />,
          iconZoomOut: () => <ZoomIcon direction="out" className="h-8 w-8" />,
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
