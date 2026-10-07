"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Dialog } from "@base-ui/react/dialog";
import type { OutlineItem } from "@/lib/posts";
import PostContents from "./PostContents";

// The id of the place in the header (Header.tsx) where a page can put a
// button of its own, next to the menu toggle.
export const HEADER_SLOT_ID = "header-page-toggle";

// The header slot, once in the browser (the header is always there by then;
// on the server there is no button).
const noSubscribe = () => () => {};
const getSlot = () => document.getElementById(HEADER_SLOT_ID);
const getNoSlot = () => null;

// A long post's contents on screens without a margin for them: a
// "Contents" button in the header, beside the menu toggle, so it is in
// reach anywhere in the text. It opens the list under the header like the
// mobile menu, with the section being read highlighted. The panel is
// rendered here, inside the post, rather than in the header, so its links
// can read the sections' timelines (scoped to the post in Post.tsx).
export default function PostContentsMenu({
  items,
  label,
}: {
  items: OutlineItem[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const slot = useSyncExternalStore(noSubscribe, getSlot, getNoSlot);
  const container = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {slot &&
        createPortal(
          <Dialog.Trigger className="text-night hover:bg-night-hover data-popup-open:bg-night-hover flex h-9 items-center rounded-[20px] border border-black/40 px-3 text-sm font-medium transition-colors sm:px-4">
            {label}
          </Dialog.Trigger>,
          slot,
        )}

      <div ref={container} className="contents" />
      <Dialog.Portal container={container}>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[10px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="bg-paper-100/90 fixed inset-x-0 top-(--header-height) z-40 max-h-[calc(100dvh-var(--header-height)-2rem)] overflow-y-auto rounded-b-[20px] px-7 py-8 backdrop-blur-[10px] transition-[transform,opacity] duration-200 ease-out data-ending-style:-translate-y-2 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0 sm:px-10">
          {/* a picked section closes the panel; the link itself scrolls */}
          <div onClick={() => setOpen(false)} className="mx-auto max-w-160">
            <PostContents items={items} label={label} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
