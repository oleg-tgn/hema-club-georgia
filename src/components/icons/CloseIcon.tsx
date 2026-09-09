type CloseIconProps = {
  className?: string;
};

export default function CloseIcon({ className }: CloseIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        y="14.1421"
        width="20"
        height="1.4"
        transform="rotate(-45 0 14.1421)"
        fill="currentColor"
      />
      <rect
        x="0.98999"
        width="20"
        height="1.4"
        transform="rotate(45 0.98999 0)"
        fill="currentColor"
      />
    </svg>
  );
}
