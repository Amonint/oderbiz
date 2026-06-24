import {
  type PortfolioItemId,
  WORK_GRID_ITEM_IMAGES,
} from "@/app/lib/agency-media";

export type WorkGridItem = {
  href: string;
  titleGroups: string[];
  serviceGroups: string[];
  excerpt: string;
  previewScale: number;
  imageUrl: string;
};

export type { PortfolioItemId };

const WORK_GRID_META: readonly {
  id: PortfolioItemId;
  href: string;
  previewScale: number;
}[] = [
  { id: "coopsem", href: "/work/coopsem", previewScale: 1 },
  { id: "padreJulian", href: "/work/padre-julian-lorente", previewScale: 1 },
  { id: "nettplus", href: "/work/nettplus", previewScale: 1 },
  { id: "odertek", href: "/work/odertek", previewScale: 1 },
  { id: "rectoralBoard", href: "/work/rectoral-board", previewScale: 1 },
  { id: "sinCulpa", href: "/work/sin-culpa", previewScale: 1 },
  { id: "uniODS", href: "/work/uni-ods", previewScale: 1 },
  { id: "maestrias", href: "/work/maestrias-utpl", previewScale: 1 },
];

type PortfolioTranslator = {
  raw: (key: string) => unknown;
  (key: string, values?: { label?: string }): string;
};

function filterTitleGroups(groups: string[]): string[] {
  return groups.filter(Boolean);
}

export function getWorkGridItems(t: PortfolioTranslator): WorkGridItem[] {
  return WORK_GRID_META.map((meta) => {
    const titleGroups = filterTitleGroups(
      t.raw(`items.${meta.id}.titleGroups`) as string[],
    );
    const serviceGroups = t.raw(`items.${meta.id}.serviceGroups`) as string[];

    return {
      href: meta.href,
      titleGroups,
      serviceGroups,
      excerpt: t(`items.${meta.id}.excerpt`),
      previewScale: meta.previewScale,
      imageUrl: WORK_GRID_ITEM_IMAGES[meta.id],
    };
  });
}
