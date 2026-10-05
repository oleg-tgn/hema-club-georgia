type CloseIconProps = {
  className?: string;
  // in viewBox units (16 = icon size); the gallery thickens it to match
  // ArrowIcon's line
  strokeWidth?: number;
};

export default function CloseIcon({
  className,
  strokeWidth = 1.4,
}: CloseIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0.495 14.637L14.637 0.495M0.495 0.495L14.637 14.637" />
    </svg>
  );
}
