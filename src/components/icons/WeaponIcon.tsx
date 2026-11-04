import Image from "next/image";

type WeaponSlug = "longsword" | "rapier" | "saber";

// Pre-rendered engravings with gilded grips, exported at 3x for sharp
// retina display; the .svg files beside them are the plain sources.
const WEAPONS: Record<WeaponSlug, { src: string; width: number; height: number }> = {
  longsword: { src: "/images/weapons/longsword.webp", width: 212, height: 42 },
  rapier: { src: "/images/weapons/rapier.webp", width: 202, height: 42 },
  saber: { src: "/images/weapons/saber.webp", width: 182, height: 38 },
};

type WeaponIconProps = {
  slug: string;
  className?: string;
};

export default function WeaponIcon({ slug, className }: WeaponIconProps) {
  const weapon = WEAPONS[slug as WeaponSlug];

  if (!weapon) {
    return null;
  }

  return (
    <Image
      src={weapon.src}
      alt=""
      aria-hidden
      width={weapon.width}
      height={weapon.height}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
