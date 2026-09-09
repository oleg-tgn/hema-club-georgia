"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog } from "@base-ui/react/dialog";
import { Link, usePathname } from "@/i18n/navigation";
import { useActiveSectionObserver } from "@/hooks/useActiveSectionObserver";
import { useActiveSection } from "./ActiveSectionProvider";
import LocaleSwitcher from "../ui/LocaleSwitcher";
import Logo from "../icons/Logo";
import BurgerIcon from "../icons/BurgerIcon";
import CloseIcon from "../icons/CloseIcon";

const menuLinks = [
  { href: "/#about", labelKey: "about", section: "about" },
  { href: "/#schedule", labelKey: "schedule", section: "schedule" },
  { href: "/#weapons", labelKey: "weapons", section: "weapons" },
  { href: "/#instructors", labelKey: "instructors", section: "instructors" },
  { href: "/#gallery", labelKey: "gallery", section: "gallery" },
  { href: "/tournaments", labelKey: "tournaments", section: null },
] as const;

const sectionIds = menuLinks
  .map((link) => link.section)
  .filter(
    (section): section is NonNullable<typeof section> => section !== null,
  );

function MenuLink({
  href,
  section,
  isHome,
  className,
  onNavigate,
  children,
}: {
  href: string;
  section: string | null;
  isHome: boolean;
  className: string;
  onNavigate?: (section: string) => void;
  children: React.ReactNode;
}) {
  // On the home page, section anchors are plain in-page links: the browser
  // handles the scroll natively, so repeat clicks always work even if
  // next/link's client router thinks the URL hasn't changed.
  if (section !== null && isHome) {
    return (
      <a
        href={`#${section}`}
        className={className}
        onClick={section ? () => onNavigate?.(section) : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Nav({
  pathname,
  currentSection,
  isHome,
  onNavigate,
  className = "",
}: {
  pathname: string;
  currentSection: string | null;
  isHome: boolean;
  onNavigate: (section: string) => void;
  className?: string;
}) {
  const t = useTranslations("Nav");

  return (
    <nav className={`items-center gap-6 xl:gap-8 ${className}`}>
      {menuLinks.map(({ href, labelKey, section }) => {
        const isActive = section
          ? currentSection === section
          : pathname === href;

        return (
          <MenuLink
            key={href}
            href={href}
            section={section}
            isHome={isHome}
            onNavigate={onNavigate}
            className={`group relative text-center text-xl xl:text-base leading-6 font-semibold text-black/40 hover:text-black w-full xl:w-auto ${
              isActive ? "text-night" : ""
            }`}
          >
            {t(labelKey)}
            <span
              className={`absolute -bottom-1 left-1/2 h-px w-5 -translate-x-1/2 ${
                isActive
                  ? "bg-gold-100"
                  : "bg-transparent group-hover:bg-gold-100"
              }`}
            />
          </MenuLink>
        );
      })}
    </nav>
  );
}

function MobileNav({
  pathname,
  currentSection,
  isHome,
  onNavigate,
}: {
  pathname: string;
  currentSection: string | null;
  isHome: boolean;
  onNavigate: (section: string) => void;
}) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="group relative flex h-9 w-16.5 items-center justify-center rounded-[20px] border border-black/40 px-4 text-night transition-colors hover:bg-night-hover xl:hidden "
        aria-label={open ? t("closeMenu") : t("openMenu")}
      >
        <BurgerIcon className="h-2.5 group-data-popup-open:hidden" />
        <CloseIcon className="h-3.75 hidden group-data-popup-open:block" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-x-0 top-(--header-height) bottom-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-x-0 top-(--header-height) z-40 flex flex-col gap-4 bg-paper-100 px-2 py-7.5 rounded-b-[20px] transition-[transform,opacity] duration-200 ease-out data-ending-style:-translate-y-2 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0">
          <div onClick={() => setOpen(false)}>
            <Nav
              pathname={pathname}
              currentSection={currentSection}
              isHome={isHome}
              onNavigate={onNavigate}
              className="flex flex-col items-center gap-6"
            />
          </div>

          <div className="flex justify-center mt-7">
            <LocaleSwitcher />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const { activeSection, setActiveSection } = useActiveSection();
  const isHome = pathname === "/";
  const currentSection = isHome ? activeSection : null;

  // While a click-triggered scroll is in flight, the IntersectionObserver
  // passes through every section between the old and new position, which
  // would otherwise flash the nav highlight across them one by one.
  const isNavigatingRef = useRef(false);

  const handleObserverChange = useCallback(
    (id: string | null) => {
      if (!isNavigatingRef.current) setActiveSection(id);
    },
    [setActiveSection],
  );

  useActiveSectionObserver(sectionIds, isHome, handleObserverChange);

  const handleNavigate = useCallback(
    (section: string) => {
      setActiveSection(section);
      isNavigatingRef.current = true;

      const clearFlag = () => {
        isNavigatingRef.current = false;
        window.removeEventListener("scrollend", clearFlag);
      };

      if ("onscrollend" in window) {
        window.addEventListener("scrollend", clearFlag, { once: true });
      } else {
        setTimeout(clearFlag, 800);
      }
    },
    [setActiveSection],
  );

  // A hard navigation (typed URL, link from another site) lands with the
  // hash already in place: the browser jumps there natively before this
  // component ever sees a click, so the same flicker needs to be suppressed
  // here too.
  useEffect(() => {
    if (!isHome) return;

    const hash = window.location.hash.slice(1);
    if ((sectionIds as readonly string[]).includes(hash)) {
      handleNavigate(hash);
    }
  }, [isHome, handleNavigate]);

  return (
    <header className="sticky top-0 z-50 bg-paper-100">
      <div className="mx-auto flex h-(--header-height) items-center justify-between container px-2 sm:px-10 md:">
        <MenuLink href="/" section="" isHome={isHome} className="group">
          <div className="flex sm:hidden">
            <Logo className="h-7 w-auto" variant="mobile" />
          </div>
          <div className="hidden sm:flex">
            <Logo className="h-5 w-auto" variant="header" />
          </div>
        </MenuLink>
        <Nav
          pathname={pathname}
          currentSection={currentSection}
          isHome={isHome}
          onNavigate={handleNavigate}
          className="hidden xl:flex"
        />
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden xl:flex">
            <LocaleSwitcher />
          </div>

          <MenuLink
            href="#join"
            section="join"
            isHome={isHome}
            onNavigate={handleNavigate}
            className="flex h-9 items-center justify-center rounded-[20px] border border-black/40 px-4 text-base leading-6 font-semibold text-night transition-colors hover:bg-night-hover"
          >
            {t("join")}
          </MenuLink>

          <MobileNav
            pathname={pathname}
            currentSection={currentSection}
            isHome={isHome}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </header>
  );
}
