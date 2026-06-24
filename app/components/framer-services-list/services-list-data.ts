export type ServiceListItem = {
  key: string;
  appearId: string;
  containerClassName: string;
  href: string;
  title: string;
  description: string;
  bullets: { label: string; href?: string }[];
};

export const SERVICES_LIST_ITEMS: readonly ServiceListItem[] = [
  {
    key: "strategy",
    appearId: "6iau91",
    containerClassName: "framer-6iau91-container",
    href: "/services/estrategia",
    title: "Marketing y estrategia digital",
    description:
      "Servicios de marketing y estrategia digital para empresas establecidas y en crecimiento. Adoptamos un enfoque holístico: analizamos su negocio como un todo, rompemos silos y alineamos a su equipo hacia un objetivo común. A medida que construye y crece, somos su socio en cada paso del camino.",
    bullets: [
      { label: "Estrategia digital y acompañamiento ejecutivo" },
      { label: "Creación de contenidos y redes bajo demanda" },
      { label: "Diseño gráfico y video para empresas" },
      { label: "Campañas de captación de clientes" },
    ],
  },
  {
    key: "content",
    appearId: "8dgr37",
    containerClassName: "framer-8dgr37-container",
    href: "/services/contenido",
    title: "Creación de contenidos",
    description:
      "Aportamos valor al público objetivo de tu empresa o negocio mediante contenido de calidad, distribuido en distintos canales, para atraer y fidelizar clientes.",
    bullets: [
      { label: "Calendario de contenidos" },
      { label: "Posts y piezas gráficas" },
      { label: "Microvídeos" },
      { label: "Community y reporting" },
    ],
  },
  {
    key: "design",
    appearId: "1e6047l",
    containerClassName: "framer-1e6047l-container",
    href: "/services/diseno",
    title: "Diseño creativo",
    description:
      "Identidad visual, piezas digitales y soportes para campañas. Diseño que comunica con orden estético y funcional, listo para implementarse en web, redes y punto de contacto con clientes.",
    bullets: [
      { label: "Identidad y sistemas visuales" },
      { label: "Piezas para campañas y redes" },
      { label: "Presentaciones y material comercial" },
      { label: "Motion y piezas de video corto" },
    ],
  },
  {
    key: "campaigns",
    appearId: "k68jj1",
    containerClassName: "framer-k68jj1-container",
    href: "/services/campanas",
    title: "Campañas y conversión",
    description:
      "Diseño e implementación de campañas de captación y remarketing con mensajes y creatividades alineados a tu embudo. Enfocados en generar leads, visitas y ventas con seguimiento claro.",
    bullets: [
      { label: "Campañas en redes y pauta digital" },
      { label: "Landing y mensajes de conversión" },
      { label: "Creatividades A/B y optimización" },
      { label: "Métricas y lectura de resultados" },
    ],
  },
] as const;
