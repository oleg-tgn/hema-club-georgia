type ZoomIconProps = {
  direction?: "in" | "out";
  className?: string;
};

// Drawn on ArrowIcon's 32px grid with the same 2-unit line, so the two
// sit together at equal weight in the gallery lightbox.
export default function ZoomIcon({
  direction = "in",
  className = "",
}: ZoomIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`size-5 shrink-0 ${className}`}
      aria-hidden
    >
      <circle cx="14" cy="14" r="6.5" />
      <path d="M18.6 18.6L24 24" />
      <path d="M11 14H17" />
      {direction === "in" && <path d="M14 11V17" />}
    </svg>
  );
}
