import type { OutlineItem } from "@/lib/posts";

// The contents of a long post: its subheadings as links, h3 indented under
// their h2. The link of the section being read is highlighted the way the
// header nav highlights home page sections - by a scroll-driven animation
// off that section's view-timeline (`.post-toc` in globals.css), no JS.
export default function PostContents({
  items,
  label,
  className = "",
}: {
  items: OutlineItem[];
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={`post-toc font-sans ${className}`}>
      <p className="text-asphalt mb-3 text-xs font-semibold tracking-widest uppercase">
        {label}
      </p>
      <ol className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="block text-sm leading-5 font-medium text-black/40 hover:text-black"
              style={{ animationTimeline: sectionTimeline(i) }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// The view-timeline of the post part for the i-th contents link: the
// opening for the title, then the section of each subheading (Post.tsx).
export function sectionTimeline(i: number): string {
  return `--post-section-${i}`;
}
