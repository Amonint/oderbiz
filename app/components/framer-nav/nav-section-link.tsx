"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

import { useScrollToSection } from "@/app/lib/scroll-to-section";

type NavSectionLinkProps = Omit<ComponentProps<"a">, "href"> & {
  sectionId: string;
  children: ReactNode;
};

export function NavSectionLink({
  sectionId,
  children,
  onClick,
  ...props
}: NavSectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollToSection } = useScrollToSection();
  const hash = `#${sectionId.replace(/^#/, "")}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.(event);

    if (pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    router.push(`/#${sectionId.replace(/^#/, "")}`);
  };

  return (
    <a href={hash} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
