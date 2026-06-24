/**
 * URLs estables de images.unsplash.com (sin archivos en /public).
 * @see https://unsplash.com/license
 */

export function unsplashPhoto(
  photoSlug: string,
  options: { w?: number; h?: number; q?: number } = {},
): string {
  const params = new URLSearchParams();
  params.set("auto", "format");
  params.set("fit", "crop");
  params.set("q", String(options.q ?? 80));
  if (options.w != null) params.set("w", String(options.w));
  if (options.h != null) params.set("h", String(options.h));
  return `https://images.unsplash.com/${photoSlug}?${params.toString()}`;
}

/** Pool editorial / agencia (orden fijo para SSR estable). */
export const UNSPLASH_AGENCY_POOL = [
  unsplashPhoto("photo-1552664730-d307ca884978", { w: 1600 }),
  unsplashPhoto("photo-1522071820081-009f0129c71c", { w: 1600 }),
  unsplashPhoto("photo-1600880292203-757bb62b4baf", { w: 1600 }),
  unsplashPhoto("photo-1497366216548-37526070297c", { w: 1600 }),
  unsplashPhoto("photo-1551434678-e076c223a692", { w: 1600 }),
  unsplashPhoto("photo-1460925895917-afdab827c52f", { w: 1600 }),
  unsplashPhoto("photo-1553877522-43269d4ea984", { w: 1600 }),
  unsplashPhoto("photo-1556761175-b413da4baf72", { w: 1600 }),
  unsplashPhoto("photo-1454165804606-c3d57bc86b40", { w: 1600 }),
  unsplashPhoto("photo-1573496359142-b8d87734a5a2", { w: 1600 }),
  unsplashPhoto("photo-1560250097-0b93528c311a", { w: 1600 }),
  unsplashPhoto("photo-1517248135467-4c7edcad34c4", { w: 1600 }),
  unsplashPhoto("photo-1507003211169-0a1dd7228f2d", { w: 1600 }),
  unsplashPhoto("photo-1438761681033-6461ffad8d80", { w: 1600 }),
  unsplashPhoto("photo-1472099645785-5658abf4ff4e", { w: 1600 }),
  unsplashPhoto("photo-1534528741775-53994a69daeb", { w: 1600 }),
  unsplashPhoto("photo-1522202176988-66273c2fd55f", { w: 1600 }),
  unsplashPhoto("photo-1559136555-9303baea8ebd", { w: 1600 }),
  unsplashPhoto("photo-1486312338219-ce68d2c6f44d", { w: 1600 }),
] as const;

/** Ticker de partners: imágenes cuadradas tipo logo. */
export const UNSPLASH_PARTNER_LOGOS = [
  unsplashPhoto("photo-1611224923853-80b023f02d71", { w: 576, h: 572 }),
  unsplashPhoto("photo-1611162616475-46b635cb6868", { w: 576, h: 572 }),
  unsplashPhoto("photo-1618005182384-a83a8bd57fbe", { w: 576, h: 572 }),
  unsplashPhoto("photo-1504384308090-c894fdcc538d", { w: 576, h: 572 }),
] as const;

export function unsplashSrcSet(url: string, widths: readonly number[]): string {
  const base = url.split("?")[0]!;
  return widths
    .map((w) => {
      const params = new URLSearchParams(url.split("?")[1] ?? "");
      params.set("w", String(w));
      return `${base}?${params.toString()} ${w}w`;
    })
    .join(", ");
}
