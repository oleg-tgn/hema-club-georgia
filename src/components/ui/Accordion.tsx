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
            <BaseAccordion.Trigger className="group text-night hover:bg-night-hover focus-visible:bg-night-hover flex w-full cursor-pointer items-center justify-between gap-4 px-1 py-5 text-left text-lg font-medium outline-none sm:px-3 sm:text-xl">
              {item.question}
              <PlusIcon className="text-gold-200 size-6 shrink-0 transition-transform duration-300 group-data-panel-open:rotate-45" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0">
            <p className="text-night/80 px-1 pb-6 text-base whitespace-pre-line sm:px-3 sm:pr-14">
              {item.answer}
            </p>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
