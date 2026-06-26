import type { FortalezasImageKey } from "@/app/lib/agency-media";

export const STRENGTH_ITEMS = [
  {
    titleKey: "strength1Title",
    imageKey: "strength1" as FortalezasImageKey,
  },
  {
    titleKey: "strength2Title",
    descriptionKey: "strength2Body",
    imageKey: "strength2" as FortalezasImageKey,
  },
  {
    titleKey: "strength3Title",
    descriptionKey: "strength3Body",
    imageKey: "strength3" as FortalezasImageKey,
  },
] as const;
