import type { CSSProperties } from "react";

const PERSONAL = "/assets/personal";

export type LineupTeamCard = {
  id: string;
  name: string;
  imageSrc: string;
  imageSrcSet: string;
  imageWidth: number;
  imageHeight: number;
  sizes: string;
  variant: "default" | "long";
  containerClass:
    | "framer-f6q77q-container"
    | "framer-1ydapr3-container"
    | "framer-18a96t-container"
    | "framer-mqlrej-container";
  cardStyle: CSSProperties;
  imgContainerStyle?: CSSProperties;
  imgFrontStyle: CSSProperties;
  imgBackStyle: CSSProperties;
};

export const LINEUP_BODY =
  "Nuestro lineup reúne voces influyentes y diversas: líderes creativos, visionarios del diseño y expertos en innovación que compartirán ideas, procesos y experiencias únicas para inspirar la próxima generación de proyectos.";

export const LINEUP_TEAM: readonly LineupTeamCard[] = [
  {
    id: "katerine",
    name: "Katerine Jiménez · Gerente General",
    imageSrc: `${PERSONAL}/KATERINE.png`,
    imageSrcSet: "",
    imageWidth: 2000,
    imageHeight: 3000,
    sizes: "(max-width: 900px) 100vw, 33vw",
    variant: "default",
    containerClass: "framer-f6q77q-container",
    cardStyle: { height: "100%", width: "100%", opacity: 1 },
    imgFrontStyle: { opacity: 1, transform: "none" },
    imgBackStyle: { opacity: 1 },
  },
  {
    id: "greeys",
    name: "Greeys Redrován · Social Media Manager",
    imageSrc: `${PERSONAL}/Diseno-sin-titulo.png`,
    imageSrcSet: "",
    imageWidth: 2000,
    imageHeight: 3000,
    sizes: "(max-width: 900px) 100vw, 33vw",
    variant: "default",
    containerClass: "framer-1ydapr3-container",
    cardStyle: { height: "100%", width: "100%", opacity: 1 },
    imgFrontStyle: { opacity: 1, transform: "none" },
    imgBackStyle: { opacity: 1 },
  },
  {
    id: "luisa",
    name: "Luisa Matailo · Contadora",
    imageSrc: `${PERSONAL}/Diseno-sin-titulo-5.png`,
    imageSrcSet: "",
    imageWidth: 2000,
    imageHeight: 3000,
    sizes: "(max-width: 900px) 100vw, 33vw",
    variant: "default",
    containerClass: "framer-18a96t-container",
    cardStyle: { height: "100%", width: "100%", opacity: 1 },
    imgFrontStyle: { opacity: 1, transform: "none" },
    imgBackStyle: { opacity: 1 },
  },
  {
    id: "pablo",
    name: "Pablo Vidal · Consultor de Marketing",
    imageSrc: `${PERSONAL}/PABLO.png`,
    imageSrcSet: "",
    imageWidth: 2000,
    imageHeight: 3000,
    sizes: "(max-width: 900px) 100vw, 33vw",
    variant: "default",
    containerClass: "framer-mqlrej-container",
    cardStyle: { height: "100%", width: "100%", opacity: 1 },
    imgFrontStyle: { opacity: 1, transform: "none" },
    imgBackStyle: { opacity: 1 },
  },
] as const;
