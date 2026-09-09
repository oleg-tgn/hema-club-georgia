type BurgerIconProps = {
  className?: string;
};

export default function BurgerIcon({ className }: BurgerIconProps) {
  return (
    <svg
      width="24"
      height="11"
      viewBox="0 0 24 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="1.4" fill="currentColor" />
      <rect y="4.4" width="24" height="1.4" fill="currentColor" />
      <rect y="8.8" width="10" height="1.4" fill="currentColor" />
    </svg>
  );
}
