const NAV_OFFSET_PX = 88;

export function scrollToSection(sectionId: string) {
  const id = sectionId.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion ? "auto" : "smooth",
  });

  window.history.replaceState(null, "", `#${id}`);
  return true;
}

export function scrollToSectionFromHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;

  requestAnimationFrame(() => {
    scrollToSection(id);
  });
}
