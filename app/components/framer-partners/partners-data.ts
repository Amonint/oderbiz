import { publicMediaUrl } from "@/app/lib/agency-media";

export type PartnerLogo = {
  id: string;
  src: string;
  alt: string;
};

const MARCAS = "/assets/marcas";

function partnerLogo(id: string, file: string, alt: string): PartnerLogo {
  return {
    id,
    src: publicMediaUrl(`${MARCAS}/${file}`),
    alt,
  };
}

export const PARTNERS_TICK_1: readonly PartnerLogo[] = [
  partnerLogo("utpl", "logo-blanco-utpl.png", "UTPL"),
  partnerLogo("utpl-tec", "utpl-tec.png", "UTPL TEC"),
  partnerLogo(
    "formacion-permanente",
    "logo-formacion-permanente.png",
    "Formación Permanente UTPL",
  ),
  partnerLogo(
    "iposgrados",
    "LOGO-POSGRADO.png",
    "iPosgrados | Universidad Politécnica Salesiana Ecuador",
  ),
  partnerLogo("maestrias-utpl", "maestrias_utpl-1.png", "Maestrías UTPL"),
  partnerLogo("nettplus", "logo-blanco-nettplus (1).png", "NETTplus"),
];

export const PARTNERS_TICK_2: readonly PartnerLogo[] = [
  partnerLogo("maxxnet", "maxxnet.png", "MaxxNet"),
  partnerLogo("piscotelcon", "piscotel.png", "PSICOTELCON"),
  partnerLogo("mariano-utpl", "MARIANO.png", "Mariano UTPL"),
  partnerLogo("rectoral-board", "logo-blanco-rectoral.png", "Rectoral Board"),
];
