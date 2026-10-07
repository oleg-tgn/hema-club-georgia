import type { OutlineItem } from "@/lib/posts";

// The contents of a long post: its subheadings as links, h3 indented under
// their h2. With `tracking` (the list beside the text) the link of the
// section being read is highlighted the way the header nav highlights home
// page sections - by a scroll-driven animation off that section's
// view-timeline (`.post-toc` in globals.css), no JS.
export default function PostContents({
  items,
  label,
  tracking = false,
  className = "",
}: {
  items: OutlineItem[];
  label: string;
  tracking?: boolean;
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      className={`font-sans ${tracking ? "post-toc" : ""} ${className}`}
    >
      <p className="text-asphalt mb-3 text-xs font-semibold tracking-widest uppercase">
        {label}
      </p>
      <ol className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className={`relative block text-sm leading-5 font-medium ${
                tracking
                  ? "text-black/40 hover:text-black"
                  : "text-night hover:text-gold-200 transition-colors"
              }`}
              style={
                tracking ? { animationTimeline: sectionTimeline(i) } : undefined
              }
            >
              {tracking && (
                <span
                  aria-hidden
                  className="absolute top-2.5 -left-4 h-px w-2.5"
                  style={{ animationTimeline: sectionTimeline(i) }}
                />
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// The view-timeline of the post section that starts with the i-th heading
// of the outline (set on that section in Post.tsx).
export function sectionTimeline(i: number): string {
  return `--post-section-${i}`;
}
