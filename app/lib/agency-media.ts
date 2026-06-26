const SERVICIOS = "/assets/servicios";
const VARIOS = "/assets/varios";

export function publicMediaUrl(relativePath: string): string {
  const trimmed = relativePath.replace(/^\/+/, "");
  return "/" + trimmed.split("/").filter(Boolean).map(encodeURIComponent).join("/");
}

export type HeroPhotoItem = {
  src: string;
  alt: string;
};

export type HeroVideoItem = {
  src: string;
  poster: string;
  alt: string;
};

const VIDEOS_OPTIMIZED = "/videos/optimized";

const SERVICIOS_IMAGES = [
  publicMediaUrl(`${SERVICIOS}/coopsem-web-1024x1536.png`),
  publicMediaUrl(`${SERVICIOS}/JULIAN-web-1024x683.png`),
  publicMediaUrl(`${SERVICIOS}/nettplus-web (1).png`),
  publicMediaUrl(`${SERVICIOS}/odertek-web.png`),
  publicMediaUrl(`${SERVICIOS}/RECTORAL-board-web.png`),
  publicMediaUrl(`${SERVICIOS}/SIN-CULPA-web.png`),
  publicMediaUrl(`${SERVICIOS}/UNIODS-web-1152x1536.png`),
  publicMediaUrl(`${SERVICIOS}/utpl-maestrias-portafolio-1024x683.png`),
] as const;

export const VARIOS_IMAGES = {
  team: publicMediaUrl(`${VARIOS}/DSC08097.JPG (1).jpeg`),
  studio: publicMediaUrl(`${VARIOS}/DSC08083.JPG (2).jpeg`),
  event: publicMediaUrl(`${VARIOS}/_DSC5637.JPG.jpeg`),
  production: publicMediaUrl(`${VARIOS}/_DSC5650.JPG (3).jpeg`),
} as const;

export const SPECIALIZATIONS_IMAGE = VARIOS_IMAGES.studio;
export const FORTALEZAS_IMAGE = VARIOS_IMAGES.event;

export const FORTALEZAS_IMAGES = {
  strength1: VARIOS_IMAGES.event,
  strength2: VARIOS_IMAGES.team,
  strength3: VARIOS_IMAGES.production,
} as const;

export type FortalezasImageKey = keyof typeof FORTALEZAS_IMAGES;

export const PILLAR_IMAGES = {
  pillar1: VARIOS_IMAGES.studio,
  pillar2: VARIOS_IMAGES.team,
  pillar3: VARIOS_IMAGES.production,
} as const;

export const HERO_PHOTOS: readonly HeroPhotoItem[] = SERVICIOS_IMAGES.slice(0, 5).map(
  (src, i) => ({
    src,
    alt: `Oderbiz — imagen ${i + 1}`,
  }),
);

export const HERO_CAROUSEL_PHOTOS: readonly HeroPhotoItem[] = SERVICIOS_IMAGES.map(
  (src, i) => ({
    src,
    alt: `Oderbiz — portafolio ${i + 1}`,
  }),
);

/** Columna A (scroll arriba): índices 0,2,4,6 */
export const HERO_CAROUSEL_COL_A: readonly HeroPhotoItem[] = HERO_CAROUSEL_PHOTOS.filter(
  (_, i) => i % 2 === 0,
);

/** Columna B (scroll abajo): índices 1,3,5 */
export const HERO_CAROUSEL_COL_B: readonly HeroPhotoItem[] = HERO_CAROUSEL_PHOTOS.filter(
  (_, i) => i % 2 === 1,
);

function heroVideo(slug: string, alt: string): HeroVideoItem {
  return {
    src: publicMediaUrl(`${VIDEOS_OPTIMIZED}/${slug}-web.mp4`),
    poster: publicMediaUrl(`${VIDEOS_OPTIMIZED}/${slug}-poster.jpg`),
    alt,
  };
}

/** Videos verticales 9:16 — comprimidos desde /assets/hero para web. */
export const HERO_VIDEOS: readonly HeroVideoItem[] = [
  heroVideo("copy_82600A4E-476B-49C6-814F-59A83AB43EB6", "Oderbiz — cobertura de evento"),
  heroVideo("copy_F6B1FCD3-AE86-4207-BAFA-44744CFF350E", "Oderbiz — producción en vivo"),
  heroVideo("IMG_2590", "Oderbiz — contenido audiovisual"),
  heroVideo("IMG_2592", "Oderbiz — grabación corporativa"),
  heroVideo("IMG_2594", "Oderbiz — behind the scenes"),
  heroVideo("IMG_2603", "Oderbiz — producción de marca"),
  heroVideo("IMG_2667", "Oderbiz — cobertura audiovisual"),
  heroVideo("IMG_2669", "Oderbiz — evento corporativo"),
  heroVideo("IMG_2702", "Oderbiz — producción integral"),
  heroVideo("IMG_2721", "Oderbiz — cobertura de lanzamiento"),
  heroVideo("IMG_2722", "Oderbiz — evento en vivo"),
  heroVideo("IMG_9728", "Oderbiz — producción audiovisual"),
  heroVideo(
    "video-output-FBB80519-82FC-487D-BA56-E7040E4DF516-1",
    "Oderbiz — contenido corporativo",
  ),
] as const;

/** Videos de la sección Quiénes somos — desde /assets/aboutus, comprimidos para web. */
export const ABOUT_VIDEOS: readonly HeroVideoItem[] = [
  heroVideo("copy_A7A4BBCD-EF10-407D-A369-655D56E0B83D", "Oderbiz — producción en estudio"),
  heroVideo("copy_F6B1FCD3-AE86-4207-BAFA-44744CFF350E", "Oderbiz — producción en vivo"),
  heroVideo("copy_FF8EDE12-FC4D-47CC-AE48-6AD83D8C2165", "Oderbiz — cobertura de evento"),
  heroVideo("fa8f04c905c24b3a91fec9dc4968fb82", "Oderbiz — contenido corporativo"),
  heroVideo("IMG_0037", "Oderbiz — equipo en acción"),
  heroVideo("IMG_2473", "Oderbiz — grabación audiovisual"),
  heroVideo("IMG_2475", "Oderbiz — behind the scenes"),
  heroVideo("IMG_2485", "Oderbiz — producción de marca"),
  heroVideo("IMG_2702", "Oderbiz — cobertura integral"),
  heroVideo("IMG_2721", "Oderbiz — cobertura de lanzamiento"),
  heroVideo("IMG_2722", "Oderbiz — evento en vivo"),
  heroVideo("IMG_2749", "Oderbiz — contenido digital"),
  heroVideo("IMG_9728", "Oderbiz — producción audiovisual"),
] as const;

/** Tres columnas del hero — reparto en zigzag para scroll continuo. */
export const HERO_VIDEO_COL_A: readonly HeroVideoItem[] = HERO_VIDEOS.filter(
  (_, i) => i % 3 === 0,
);
export const HERO_VIDEO_COL_B: readonly HeroVideoItem[] = HERO_VIDEOS.filter(
  (_, i) => i % 3 === 1,
);
export const HERO_VIDEO_COL_C: readonly HeroVideoItem[] = HERO_VIDEOS.filter(
  (_, i) => i % 3 === 2,
);

export type PortfolioItemId =
  | "coopsem"
  | "padreJulian"
  | "nettplus"
  | "odertek"
  | "rectoralBoard"
  | "sinCulpa"
  | "uniODS"
  | "maestrias";

export const WORK_GRID_ITEM_IMAGES: Record<PortfolioItemId, string> = {
  coopsem: publicMediaUrl(`${SERVICIOS}/coopsem-web-1024x1536.png`),
  padreJulian: publicMediaUrl(`${SERVICIOS}/JULIAN-web-1024x683.png`),
  nettplus: publicMediaUrl(`${SERVICIOS}/nettplus-web (1).png`),
  odertek: publicMediaUrl(`${SERVICIOS}/odertek-web.png`),
  rectoralBoard: publicMediaUrl(`${SERVICIOS}/RECTORAL-board-web.png`),
  sinCulpa: publicMediaUrl(`${SERVICIOS}/SIN-CULPA-web.png`),
  uniODS: publicMediaUrl(`${SERVICIOS}/UNIODS-web-1152x1536.png`),
  maestrias: publicMediaUrl(`${SERVICIOS}/utpl-maestrias-portafolio-1024x683.png`),
};

export const WORK_GRID_IMAGE_URLS: readonly string[] = Object.values(WORK_GRID_ITEM_IMAGES);

const TESTIMONIALS = "/assets/testimonial";

export const TESTIMONIAL_AVATARS = {
  marisol: publicMediaUrl(`${TESTIMONIALS}/piscotelfoto.png`),
  ipAccess: publicMediaUrl(`${TESTIMONIALS}/IP-ACCESS-LOGO.png`),
  ortam: publicMediaUrl(`${TESTIMONIALS}/ORTAM-LOGO.png`),
  elizabeth: publicMediaUrl(`${TESTIMONIALS}/logo-soy-mas.png`),
  oscar: publicMediaUrl(
    `${TESTIMONIALS}/WhatsApp-Image-2021-09-02-at-11.11.18-AM.jpeg`,
  ),
  luciano: publicMediaUrl(`${TESTIMONIALS}/Luciano-Rodriguez-.jpeg`),
  maxxnet: publicMediaUrl(`${TESTIMONIALS}/maxxnet-LOGO.png`),
} as const;

export type TestimonialAvatarKey = keyof typeof TESTIMONIAL_AVATARS;

/** Relación ancho/alto del logo o retrato en tarjetas de testimonio (patrón Ventriloc). */
export const TESTIMONIAL_LOGO_RATIOS: Record<TestimonialAvatarKey, number> = {
  marisol: 1,
  ipAccess: 1.47,
  ortam: 1.2,
  elizabeth: 1.1,
  oscar: 1,
  luciano: 1,
  maxxnet: 1.35,
};

/** Logo principal en barra / pie (PNG bajo /LOGO). */
export const AGENCY_LOGO_MAIN = publicMediaUrl("LOGO/LOGO-ODERBIZ.png");

/** Logo blanco con texto — ideal para fondos oscuros (footer). */
export const AGENCY_LOGO_WHITE = publicMediaUrl("LOGO/logo-blanco-text.png");
