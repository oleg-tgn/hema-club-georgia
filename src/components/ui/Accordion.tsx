"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";

export type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    // hiddenUntilFound keeps closed answers in the DOM so the browser's
    // find-in-page (and crawlers) can reach them; a match opens the item.
    <BaseAccordion.Root hiddenUntilFound className="flex w-full flex-col">
      {items.map((item) => (
        <BaseAccordion.Item
          key={item.id}
          value={item.id}
          className="border-night/20 border-b first:border-t"
        >
          <BaseAccordion.Header>
            <BaseAccordion.Trigger className="group text-night hover:bg-night-hover focus-visible:bg-night-hover data-panel-open:bg-night-hover flex w-full cursor-pointer items-center justify-between gap-4 px-1 py-5 text-left text-base leading-[1.4] font-medium outline-none sm:px-3 sm:text-lg">
              {item.question}
              <PlusMinusIcon className="text-gold-200 size-6 shrink-0" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0">
            <p className="text-night px-1 pt-1 pb-6 text-base leading-relaxed whitespace-pre-line sm:px-3 sm:pr-14">
              {item.answer}
            </p>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}

// "+" when closed, "−" when open: the vertical stroke collapses into the
// horizontal one, driven by the trigger's data-panel-open (the `group`).
function PlusMinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4 12h16" />
      <path
        d="M12 4v16"
        className="origin-center transition-transform duration-300 group-data-panel-open:scale-y-0"
      />
    </svg>
  );
}
