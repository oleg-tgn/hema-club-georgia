import Image from "next/image";

// The four Liechtenauer guards, drawn as fencer figures. Every file shares
// one square canvas, with the figures at the same scale and their feet on
// the same line, so any two rendered at the same width line up - size them
// with a single width class.
const GUARDS = {
  "vom-tag": "Vom Tag",
  ochs: "Ochs",
  pflug: "Pflug",
  alber: "Alber",
} as const;

export type GuardName = keyof typeof GUARDS;

export default function Guard({
  name,
  className = "",
}: {
  name: GuardName;
  className?: string;
}) {
  return (
    <Image
      src={`/images/guards/${name}.svg`}
      alt={GUARDS[name]}
      title={GUARDS[name]}
      width={380}
      height={380}
      className={`h-auto ${className}`}
    />
  );
}

// The same figure as a mask filled with the current text colour, for a
// faint backdrop that takes a tint (the files themselves are drawn in black).
export function GuardShape({
  name,
  className = "",
}: {
  name: GuardName;
  className?: string;
}) {
  const src = `url(/images/guards/${name}.svg)`;
  return (
    <span
      aria-hidden
      className={`block aspect-square bg-current ${className}`}
      style={{
        WebkitMaskImage: src,
        maskImage: src,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
