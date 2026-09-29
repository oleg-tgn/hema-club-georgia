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
