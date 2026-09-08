export default function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.5 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V12C2.5 12.8284 3.17157 13.5 4 13.5H12C12.8284 13.5 13.5 12.8284 13.5 12V9H14.5V12C14.5 13.3807 13.3807 14.5 12 14.5H4C2.61929 14.5 1.5 13.3807 1.5 12V4C1.5 2.61929 2.61929 1.5 4 1.5H7.5V2.5ZM13.7998 1.52832C14.138 1.52832 14.42 1.76803 14.4854 2.08691L14.5 2.22852V6.99414H13.5V3.11328L7.35352 9.25977L6.64648 8.55273L12.6709 2.52832H9.5V1.52832H13.7998Z"
        fill="currentColor"
      />
    </svg>
  );
}
