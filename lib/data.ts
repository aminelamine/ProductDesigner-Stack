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

export const ABOUT = {
  title: "Manifeste",
  paragraphs: [
    "Je ne suis pas un designer qui utilise l'IA. Je suis un designer qui pense avec. La différence n'est pas sémantique — elle change tout : la façon de cadrer un problème, de structurer un système, de livrer un produit.",
    "Pendant des années, le design produit s'est construit sur un postulat simple : comprendre les utilisateurs, puis concevoir pour eux. L'IA ne supprime pas ce postulat — elle l'accélère et le complexifie. Les interfaces deviennent adaptatives, les parcours se personnalisent, les systèmes apprennent. Le designer qui ne comprend pas ces mécanismes ne conçoit plus — il décore.",
    "Mon travail consiste à intégrer l'IA dans la réflexion produit, pas dans le pitch deck. Ça veut dire challenger les hypothèses avec des données, prototyper avec des modèles, et construire des systèmes de design qui tiennent quand l'IA génère du contenu à l'échelle.",
    "Ce n'est pas une posture. C'est une pratique quotidienne — et c'est ce que je documente chaque semaine dans Obsolet.",
  ],
  ctaText: "Lire Obsolet",
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
