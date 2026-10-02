// Book-style tailpiece closing a text: two crossed swords between hairlines.
// Used by the mirrored Hero / Join pair only, so it keeps its weight.
export default function Tailpiece() {
  const sword = (
    <g stroke="currentColor" strokeLinecap="round" fill="none">
      <path d="M9 23 L 27 5" strokeWidth="1.6" />
      <path d="M6.5 20.5 L 11.5 25.5" strokeWidth="1.6" />
      <path d="M9 23 L 5.5 26.5" strokeWidth="2.2" />
      <circle cx="4.6" cy="27.4" r="1.3" fill="currentColor" stroke="none" />
    </g>
  );

  return (
    <div
      aria-hidden
      className="text-gold-200 flex max-w-160 items-center justify-center gap-4"
    >
      <span className="bg-gold-200/60 h-px w-16" />
      <svg viewBox="0 0 32 32" className="h-8 w-auto">
        {sword}
        <g transform="matrix(-1 0 0 1 32 0)">{sword}</g>
      </svg>
      <span className="bg-gold-200/60 h-px w-16" />
    </div>
  );
}
