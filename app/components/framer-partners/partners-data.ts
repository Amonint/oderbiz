export type PartnerLogo = {
  id: string;
  src: string;
  alt: string;
};

const MARCAS = "/assets/marcas";

export const PARTNERS_TICK_1: readonly PartnerLogo[] = [
  { id: "tec", src: `${MARCAS}/logo-TEC_BLANCO.png`, alt: "UTPL TEC" },
  {
    id: "formacion-permanente",
    src: `${MARCAS}/logo-formacion-permanente.png`,
    alt: "Formación Permanente UTPL",
  },
  {
    id: "posgrado",
    src: `${MARCAS}/LOGO-POSGRADO.png`,
    alt: "iPosgrados | Universidad Politécnica Salesiana Ecuador",
  },
  { id: "piscotel", src: `${MARCAS}/piscotel.png`, alt: "PSICOTELCON" },
  { id: "soy-plus", src: `${MARCAS}/soy-+-blanco.png`, alt: "soy+ cultural utpl" },
];

export const PARTNERS_TICK_2: readonly PartnerLogo[] = [
  { id: "oderbiz-color", src: `${MARCAS}/LOGO_COLOR.png`, alt: "Oderbiz" },
  { id: "oderbiz-blanco", src: `${MARCAS}/LOGO_BLANCO.png`, alt: "Oderbiz" },
  {
    id: "formacion-permanente-b",
    src: `${MARCAS}/logo-formacion-permanente-b.png`,
    alt: "Formación Permanente UTPL",
  },
  {
    id: "posgrado-b",
    src: `${MARCAS}/LOGO-POSGRADOB.png`,
    alt: "Maestrías UTPL",
  },
];
