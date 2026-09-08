type ArrowIconProps = {
  direction?: "right" | "left" | "up-right";
  className?: string;
};

const TRANSFORMS = {
  right: "",
  left: "scaleX(-1)",
  "up-right": "rotate(-45deg)",
};

export default function ArrowIcon({
  direction = "right",
  className = "",
}: ArrowIconProps) {
  const transform = TRANSFORMS[direction];

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={`size-5 shrink-0 ${className}`}
      style={{ transform }}
      aria-hidden
    >
      <path
        d="M16.6812 22.7337L15.267 21.3195L19.6125 16.974H9.61223V14.9742H19.5076L15.267 10.7336L16.6812 9.31941L23.3884 16.0266L16.6812 22.7337ZM20.5579 16.0286L20.56 16.0266L20.5579 16.0245V16.0286Z"
        fill="currentColor"
      />
    </svg>
  );
}
