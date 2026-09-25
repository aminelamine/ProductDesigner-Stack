export const SITE = {
  name: "Amine Lamine",
  description:
    "Product Designer — Design × IA × Leadership",
} as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Obsolet", href: "https://obsolet.substack.com/", external: true },
];

export const HERO = {
  // Verbatim LinkedIn positioning locked by spec P-001 CA-5 — no paraphrase.
  headline: "Creative Explorer | Product Designer | Agentic Design",
  subtitle: "Product Designer – AI & Product Systems",
} as const;

export const FOOTER_LINKS: NavItem[] = [
  { label: "Obsolet", href: "https://obsolet.substack.com/", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lamineamine/",
    external: true,
  },
];

export const OBSOLET_URL = "https://obsolet.substack.com/";
export const NEW_TAB_HINT = "(nouvel onglet)";

// Manifeste — version A chosen by the Talent (sessions/about_parcours.md, 2026-09-24).
// `keys[i]` is the sentence set in bold in that version: a substring of `paragraphs[i]`.
export const ABOUT = {
  title: "Manifeste",
  paragraphs: [
    "Pendant seize ans, j'ai fabriqué. Des pixels, des maquettes, des systèmes. Puis les outils ont appris à fabriquer plus vite que moi. Le craft n'a pas disparu. Il a migré.",
    "Il a quitté la main pour aller dans l'œil. Générer est devenu facile ; choisir ne l'est pas. L'intention reste humaine, et c'est elle qui fait le design.",
    "Alors je travaille avec l'IA, pas à côté d'elle. Je cadre, je trie, je dirige. Entre l'humain et la machine, je refuse de choisir.",
    "Et je laisse de la place à ce que personne n'a demandé : le hasard, le détour, le dehors. C'est ce que je documente chaque semaine dans Obsolet.",
  ],
  keys: [
    "Le craft n'a pas disparu. Il a migré.",
    "L'intention reste humaine, et c'est elle qui fait le design.",
    "Entre l'humain et la machine, je refuse de choisir.",
    "C'est ce que je documente chaque semaine dans Obsolet.",
  ],
  chute:
    "Je ne suis pas un designer qui utilise l'IA. Je suis un designer qui pense avec.",
  chuteKicker: "Arrivée · aujourd'hui",
  chuteStats: {
    years: "ans d'exploration",
    clients: "marques & clients",
    startups: "startups accompagnées",
  },
  chuteOpen: "L'exploration continue →",
  ctaText: "Lire Obsolet",
} as const;

// ── Parcours (P-002) — facts from sessions/about_parcours.md, Talent's arbitrations win ──
export type StepKind = "formation" | "poste" | "mission";
export type StepSign = "depart" | "itin" | "mission" | "relais";

export interface StepResult {
  num: string;
  cap: string;
}

export interface Step {
  kind: StepKind;
  id: string;
  sign: StepSign;
  /** "YYYY" or "YYYY-MM". Absent: undated (HA), placed in order, never anchored in time. */
  start?: string;
  /** "YYYY-MM", or "now". Absent: a single date. */
  end?: string;
  /** Employer of a mission. */
  parent?: string;
  place?: string;
  org: string;
  role?: string;
  fact?: string;
  board?: readonly string[];
  results?: readonly StepResult[];
  /** The incubator's beneficiaries are counted as startups, not as a client. */
  incubator?: boolean;
  badge?: { year: number; label: string };
}

export interface ToolsAside {
  kind: "tools";
  from: string;
  fromYear: number;
  toYear?: number;
  tools: readonly string[];
}

export interface MilestoneAside {
  kind: "jalon";
  year: number;
  badge: string;
  text: string;
}

export type TempsItem = Step | ToolsAside | MilestoneAside;

export interface Temps {
  id: string;
  title: string;
  items: readonly TempsItem[];
}

const DESIGNER_AD = "UX/UI Designer, Art Director";

export const PARCOURS = {
  index: { num: "02 / ", label: "Parcours" },
  seuilTitle: "2008 → aujourd'hui. Sept postes, une ligne.",
  legendLabel: "Légende de la ligne",
  legend: [
    { sign: "depart", label: "Départ" },
    { sign: "itin", label: "Itinéraire" },
    { sign: "mission", label: "Mission" },
    { sign: "relais", label: "Relais" },
  ] as readonly { sign: StepSign; label: string }[],
  skip: "Passer le parcours",
  minimapLabel: "Mini-carte du parcours",
  labels: {
    formation: "Formation",
    poste: "Poste",
    missionAt: "Mission chez",
    clients: "Clients",
    tools: "Outils",
    conferences: "Conférences",
    today: "aujourd'hui",
    experience: "ans d'expérience",
    months: ["janv.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  },
  temps: [
    {
      id: "avant",
      title: "Avant, la direction artistique.",
      items: [
        { kind: "formation", id: "st-f08", sign: "depart", start: "2008", org: "Institut Supérieur des Arts Multimédia", role: "Licence, Communication graphique" },
        { kind: "formation", id: "st-f10", sign: "depart", start: "2010", org: "Institut Ingemedia", role: "Master, Media Engineering" },
        { kind: "tools", from: "st-crealyse", fromYear: 2010, toYear: 2016, tools: ["Suite Adobe", "Photoshop", "Illustrator", "Premiere"] },
        { kind: "poste", id: "st-crealyse", sign: "itin", start: "2010-02", end: "2010-07", place: "Paris", org: "Crealyse", role: "Web Designer", fact: "Sites web et apps mobiles (iOS, Android)" },
        { kind: "poste", id: "st-mmc", sign: "itin", start: "2010-09", end: "2010-12", place: "Tunisie", org: "MMC / DDB Tunisia", role: "UI Designer, Art Director", fact: "Branding" },
        { kind: "poste", id: "st-havas", sign: "itin", start: "2011-01", end: "2016-04", place: "Tunisie", org: "Havas Worldwide Tunisia", role: DESIGNER_AD, fact: "Plateformes digitales, DA d'apps et de sites", board: ["Citroën", "UBCI (BNP Paribas)", "BIAT", "Tunisie Telecom"] },
        { kind: "tools", from: "st-wunderman", fromYear: 2016, toYear: 2019, tools: ["Sketch", "InVision", "Google Web Designer"] },
        { kind: "poste", id: "st-wunderman", sign: "itin", start: "2016-06", end: "2017-07", org: "Wunderman Thompson", role: DESIGNER_AD, fact: "Activations digitales cross-canal", board: ["Zain", "Infiniti Cars", "Boubyan Bank"] },
        { kind: "poste", id: "st-3sg", sign: "itin", start: "2017-09", end: "2019-05", org: "3SG BBDO", role: DESIGNER_AD, fact: "Leadership créatif, supervision des équipes", board: ["Lloyd Assurance", "Délice Danone", "SEAT"] },
      ],
    },
    {
      id: "puis",
      title: "Puis, le produit.",
      items: [
        { kind: "tools", from: "st-bab", fromYear: 2019, toYear: 2025, tools: ["Figma", "lottielab", "Webflow", "Google Analytics", "Hotjar"] },
        { kind: "poste", id: "st-bab", sign: "itin", start: "2019-06", end: "2023-02", place: "Île-de-France", org: "Brand and Bear", role: "Product Designer — UI & Design System", fact: "Lead designer consultant" },
        { kind: "mission", id: "st-pmdr", sign: "mission", parent: "st-bab", start: "2019-06", end: "2020-12", org: "Philip Morris Discover Red", fact: "Discovery, design system, identité visuelle" },
        { kind: "mission", id: "st-afkar", sign: "mission", parent: "st-bab", start: "2019-07", end: "2022-07", org: "Afkar Incubator", role: "Product Designer, Art Director & Creative Coach", fact: "Workshops branding / UX / prototypage", results: [{ num: "+100", cap: "startups accompagnées" }], incubator: true },
        { kind: "mission", id: "st-driverhero", sign: "mission", parent: "st-bab", start: "2021-05", end: "2022-06", org: "DriverHero", fact: "A/B tests", results: [{ num: "−40 %", cap: "sur le temps d'embauche" }] },
        { kind: "mission", id: "st-inteliam", sign: "mission", parent: "st-bab", start: "2022-07", end: "2022-09", org: "Inteliam", fact: "Durabilité automobile" },
        { kind: "mission", id: "st-ha", sign: "mission", parent: "st-bab", org: "HA", fact: "Site marchand prêt-à-porter (refonte UX/UI, ateliers)" },
      ],
    },
    {
      id: "aujourdhui",
      title: "Aujourd'hui, avec l'IA.",
      items: [
        { kind: "poste", id: "st-niji", sign: "itin", start: "2023-03", end: "now", place: "Paris", org: "Niji", role: "Senior Product Designer, Agentic Design", fact: "IA, AI-driven design" },
        {
          kind: "mission", id: "st-sncf", sign: "mission", parent: "st-niji", start: "2023-03", end: "2025-06", org: "SNCF Gares & Connexions",
          role: "Product Designer Senior & Lead Design System",
          fact: "App MaGare SNCF · design system unifié (Atomic, tokens, Style Dictionary) · app métier OCTAVE · site Gares & Connexions",
          badge: { year: 2024, label: "JO Paris · Gare du Nord" },
          results: [
            { num: "5,11 → 7,15", cap: "RGAA" },
            { num: "−33 %", cap: "de temps d'intégration front (tokens automatisés)" },
            { num: "+17 %", cap: "sur « Naviguer »" },
            { num: "−40 %", cap: "sur le wallet en 30 jours" },
            { num: "JO Paris 2024", cap: "Gare du Nord — écrans immersifs augmentés par l'IA" },
          ],
        },
        { kind: "jalon", year: 2023, badge: "Adobe MAX · Config", text: "Adobe MAX 2023, Config 2023" },
        { kind: "tools", from: "st-vb", fromYear: 2025, tools: ["ChatGPT", "Gemini", "NotebookLM", "Claude", "Lovable", "FigmaMake", "N8N", "Weavy"] },
        { kind: "mission", id: "st-vb", sign: "mission", parent: "st-niji", start: "2025-06", end: "2025-07", org: "V&B", role: "Product Designer Senior – E-commerce & Omnicanal", fact: "Refonte du site e-commerce B2C en plateforme servicielle omnicanale" },
        { kind: "jalon", year: 2025, badge: "Make it. Paris · Config London", text: "Adobe Make it. Paris 2025, Figma Config London 2025" },
        {
          kind: "mission", id: "st-carrefour", sign: "relais", parent: "st-niji", start: "2025-09", end: "now", org: "Carrefour",
          role: "Product Designer Senior – AI & Product Orchestration",
          fact: "Plateforme interne d'orchestration IA, architecture agentique",
          results: [
            { num: "−25 à 30 %", cap: "du temps sur les tâches opérationnelles produit" },
            { num: "×2", cap: "objectif sur les délais de création/validation des tickets" },
          ],
        },
      ],
    },
  ] as readonly Temps[],
} as const;

export const CONTACT = {
  title: "Travaillons ensemble",
  description:
    "Un projet à l'intersection du design et de l'IA ? Une question sur ma démarche ? Écrivez-moi.",
  email: "lamine.amine@gmail.com",
  ctaText: "Envoyer un email",
} as const;

export interface ObsoletArticle {
  title: string;
  href: string;
}

export const OBSOLET_SECTION = {
  title: "Obsolet — la newsletter",
  description:
    "Chaque semaine, j'explore comment l'IA transforme le travail de design — pas les outils, mais la façon de penser. Réflexions, frameworks, et retours d'expérience d'un praticien.",
  ctaText: "Lire Obsolet",
  recentArticles: [
    {
      title: "Pourquoi les designers doivent apprendre à prompter",
      href: "https://obsolet.substack.com/",
    },
    {
      title: "Le design system face à l'IA générative",
      href: "https://obsolet.substack.com/",
    },
    {
      title: "Penser en systèmes, pas en écrans",
      href: "https://obsolet.substack.com/",
    },
  ] as ObsoletArticle[],
} as const;
