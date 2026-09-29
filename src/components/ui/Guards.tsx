import Image from "next/image";

// The four Liechtenauer guards, drawn as fencer figures. Size classes are
// the defaults for the About section; pass `className` to adjust.

export function VomTag({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-vom-tag.svg"
      alt="Vom Tag"
      title="Vom Tag"
      width={222}
      height={285}
      className={`h-auto w-[200px] sm:w-[222px] 2xl:w-[259px] ${className}`}
    />
  );
}

export function Pflug({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-pflug.svg"
      alt="Pflug"
      title="Pflug"
      width={332}
      height={183}
      className={`h-auto w-[332px] 2xl:w-[385px] ${className}`}
    />
  );
}

export function Alber({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-alber.svg"
      alt="Alber"
      title="Alber"
      width={304}
      height={188}
      className={`h-auto w-[304px] 2xl:w-[353px] ${className}`}
    />
  );
}

export function Ochs({ className }: { className: string }) {
  return (
    <Image
      src="/images/about-ochs.svg"
      alt="Ochs"
      title="Ochs"
      width={274}
      height={241}
      className={`h-auto w-[243px] sm:w-[274px] 2xl:w-[317px] ${className}`}
    />
  );
}
