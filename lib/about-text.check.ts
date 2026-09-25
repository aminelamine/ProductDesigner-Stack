import { ABOUT } from "./data";
import { frenchSpacing, minimapKey, noWidow, plain, sentences, splitKey } from "./about-text";

// §3b — text criteria of P-002: what the components render, normalised, equals the data.
function check(id: string, ok: boolean, detail: string): void {
  if (!ok) throw new Error(`${id} failed: ${detail}`);
  console.log(`${id} ${detail} — passed`);
}

const VERSION_A = [
  "Pendant seize ans, j'ai fabriqué. Des pixels, des maquettes, des systèmes. Puis les outils ont appris à fabriquer plus vite que moi. **Le craft n'a pas disparu. Il a migré.**",
  "Il a quitté la main pour aller dans l'œil. Générer est devenu facile ; choisir ne l'est pas. **L'intention reste humaine, et c'est elle qui fait le design.**",
  "Alors je travaille avec l'IA, pas à côté d'elle. Je cadre, je trie, je dirige. **Entre l'humain et la machine, je refuse de choisir.**",
  "Et je laisse de la place à ce que personne n'a demandé : le hasard, le détour, le dehors. **C'est ce que je documente chaque semaine dans Obsolet.**",
];

const [s1, s2] = sentences(ABOUT.chute);
check("CA-6", plain(`${noWidow(s1)} ${noWidow(s2)}`) === ABOUT.chute, "rendered chute (nbsp normalised) equals ABOUT.chute");

const rendered = ABOUT.paragraphs.map((p, i) => plain(splitKey(p, ABOUT.keys[i]).map(frenchSpacing).join("")));
check("CA-7", ABOUT.paragraphs.length === 4 && ABOUT.paragraphs.every((p, i) => p === VERSION_A[i].replace(/\*\*/g, "")) &&
  rendered.every((r, i) => r === ABOUT.paragraphs[i]),
  "4 paragraphs of version A without ** and their rendering equals ABOUT.paragraphs[i]");

const bold = VERSION_A.map((p) => /\*\*(.+)\*\*/.exec(p)?.[1]);
const once = (hay: string, needle: string) => hay.indexOf(needle) >= 0 && hay.indexOf(needle) === hay.lastIndexOf(needle);
const all = [...ABOUT.paragraphs, ABOUT.chute].join(" ");
check("CA-8", ABOUT.keys.every((k, i) => k === bold[i] && once(ABOUT.paragraphs[i], k) && once(all, k)),
  "the 4 highlighted sentences are the bold passages, each once in its paragraph and in the section text");

const moves = [
  minimapKey("ArrowRight", 2, 7) === 3, minimapKey("ArrowLeft", 2, 7) === 1,
  minimapKey("Home", 4, 7) === 0, minimapKey("End", 1, 7) === 6,
  minimapKey("ArrowRight", 6, 7) === 6, minimapKey("ArrowLeft", 0, 7) === 0,
  minimapKey("Enter", 3, 7) === null, minimapKey("a", 3, 7) === null,
];
check("CA-17", moves.every(Boolean), "minimap keys: → ← next / previous, Home / End first / last, clamped at both ends, others ignored");
