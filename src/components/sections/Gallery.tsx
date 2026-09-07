"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const photos = [
  "/images/training1.jpg",
  "/images/training2.jpg",
  "/images/training3.jpg",
  "/images/training4.jpg",
];

export default function Gallery() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop
      pagination={{ clickable: true }}
      navigation
      className="max-w-5xl mx-auto gallery-swiper"
    >
      {photos.map((src) => (
        <SwiperSlide key={src}>
          <div className="aspect-video w-full overflow-hidden rounded shadow">
            <Image
              src={src}
              alt="training"
              width={1280}
              height={720}
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
