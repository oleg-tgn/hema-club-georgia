type ArrowIconProps = {
  external?: boolean;
  className: string;
};

const EXTERNAL_PATH =
  "M21.2432 20.2798H19.2432V14.1343L12.1719 21.2056L10.7578 19.7915L17.7549 12.7944H11.7578V10.7944H21.2432V20.2798ZM19.2432 12.7974V12.7944H19.2402L19.2432 12.7974Z";

const INTERNAL_PATH =
  "M16.6812 22.7337L15.267 21.3195L19.6125 16.974H9.61223V14.9742H19.5076L15.267 10.7336L16.6812 9.31941L23.3884 16.0266L16.6812 22.7337ZM20.5579 16.0286L20.56 16.0266L20.5579 16.0245V16.0286Z";

export default function ArrowIcon({ external = false, className }: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={`size-5 shrink-0 ${className}`}
      aria-hidden
    >
      <path d={external ? EXTERNAL_PATH : INTERNAL_PATH} fill="currentColor" />
    </svg>
  );
}
