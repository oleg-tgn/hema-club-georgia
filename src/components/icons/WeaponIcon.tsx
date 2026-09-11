type WeaponSlug = "longsword" | "rapier" | "saber";

const WEAPONS: Record<WeaponSlug, { src: string; width: number; height: number }> = {
  longsword: { src: "/images/weapons/longsword.svg", width: 212, height: 42 },
  rapier: { src: "/images/weapons/rapier.svg", width: 202, height: 42 },
  saber: { src: "/images/weapons/saber.svg", width: 182, height: 38 },
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
    <span
      aria-hidden
      className={`inline-block bg-current ${className ?? ""}`}
      style={{
        aspectRatio: `${weapon.width} / ${weapon.height}`,
        WebkitMaskImage: `url(${weapon.src})`,
        maskImage: `url(${weapon.src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
