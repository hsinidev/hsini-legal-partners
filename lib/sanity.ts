import { createClient } from "@sanity/client";

// 1. Declare standard Insight type interface
export interface LegalInsight {
  title: string;
  slug: string;
  category: "Treatise" | "Executive Briefing" | "Case Analysis";
  summary: string;
  date: string;
  readingTime: string;
  author: string;
  authorTitle: string;
  content: string[]; // Content paragraphs
  goldQuote?: string;
  goldQuoteAuthor?: string;
}

// 2. High-fidelity mock publications representing editorial prestige
const MOCK_INSIGHTS: LegalInsight[] = [
  {
    title: "The Architecture of Cross-Border Venture Restructuring",
    slug: "cross-border-venture-restructuring",
    category: "Treatise",
    summary: "An in-depth analysis of structural risk allocation, multi-jurisdictional tax bounds, and corporate governance protection schemes in G20 seed ventures.",
    date: "May 12, 2026",
    readingTime: "12 min read",
    author: "Hsini Chen, Esq.",
    authorTitle: "Senior Managing Partner",
    content: [
      "In the modern technology sector, the structural design of cross-border venture capital allocations is no longer a mere exercise in compliance. It has evolved into an architecture of structural protection. For capital pools deploying into emerging technology firms operating across multiple sovereigns (such as the US, EU, and Singapore), standard single-jurisdiction corporate setups are increasingly fragile.",
      "Effective capital preservation requires a sophisticated holding network that segments risk at the sovereign border. This treatise addresses the primary legal mechanisms for executing structural separation: utilizing dual-tier irrevocable trusts, cross-collateralization covenants, and strategic debt positioning.",
      "Furthermore, the recent tax rulings in the EU and changes in global minimum tax structures demand that corporations establish authentic, localized operational nodes. Empty holding registries are no longer sufficient to secure intellectual property exemptions. Capital houses must structure active, managed entities to preserve transactional integrity.",
    ],
    goldQuote: "A corporate boundary that is not reinforced by active, localized operations is an illusion that courts will quickly dissolve under scrutiny.",
    goldQuoteAuthor: "Hsini Chen, Esq.",
  },
  {
    title: "Patent Safeguards in Generative AI Pipelines",
    slug: "patent-safeguards-generative-ai",
    category: "Executive Briefing",
    summary: "Navigating intellectual property exposures, code ingestion licenses, and patent liabilities in large-scale machine learning models.",
    date: "April 28, 2026",
    readingTime: "8 min read",
    author: "Hsini Chen, Esq.",
    authorTitle: "Senior Managing Partner",
    content: [
      "The rapid commercialization of large-scale generative machine learning models has outpaced legal framework maturity. Enterprise tech leaders deploying integrated AI pipelines face immediate, high-stakes intellectual property vulnerabilities. The ingestion of copyrighted materials and patented training architectures creates risk vectors that standard enterprise indemnities cannot cover.",
      "To establish bulletproof intellectual property defense, enterprises must enforce clean ingestion policies, create authenticated isolation logs for algorithmic pipelines, and establish proactive patent rings around their unique tuning and inference logic.",
      "This briefing details the strict code isolation protocols required to prevent ingestion contamination, securing software patents and trade secrets from retroactive infringement litigation.",
    ],
    goldQuote: "Indemnity clauses are reactive shields; algorithmic pipeline isolation is a proactive fortress.",
    goldQuoteAuthor: "Hsini Chen, Esq.",
  },
  {
    title: "Defense Covenants Against Hostile Venture Splits",
    slug: "hostile-venture-splits-defense",
    category: "Case Analysis",
    summary: "Analyzing core defense maneuvers, protective share arrangements, and litigation pathways in high-stakes startup board disputes.",
    date: "March 18, 2026",
    readingTime: "10 min read",
    author: "Hsini Chen, Esq.",
    authorTitle: "Senior Managing Partner",
    content: [
      "When tech startup boards split over capital acquisition or buyout terms, the conflict quickly escalates into a zero-sum legal war. Founders often find themselves outvoted and diluted by institutional venture capital syndicates executing drag-along rights.",
      "Securing the firm's core assets requires early, strategic implementation of weighted multi-tier voting shares, proactive deadlock mediation agreements, and aggressive board veto provisions.",
      "Through a retrospective analysis of recent high-stakes board deadlocks, this case analysis details the surgical litigation procedures required to freeze hostile asset separations and preserve founder control.",
    ],
    goldQuote: "Drag-along rights are structural weapons that must be mitigated long before the board table becomes a combat arena.",
    goldQuoteAuthor: "Hsini Chen, Esq.",
  },
];

// 3. Initialize Sanity Client
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const isSanityConfigured =
  projectId &&
  projectId !== "mock_project_id" &&
  !projectId.startsWith("your_sanity");

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-05-21",
      useCdn: true,
    })
  : null;

// 4. CMS Service Layer with Graceful Dual-Mode mock fallback
export async function getLegalInsights(): Promise<LegalInsight[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      // Query Sanity using GROQ for publication posts
      const query = `*[_type == "insight"] {
        title,
        "slug": slug.current,
        category,
        summary,
        date,
        readingTime,
        author,
        authorTitle,
        content,
        goldQuote,
        goldQuoteAuthor
      } | order(date desc)`;
      const sanityData = await sanityClient.fetch(query);
      if (sanityData && sanityData.length > 0) return sanityData;
    } catch (error) {
      console.warn("Sanity fetch failed, falling back to local dataset.", error);
    }
  }

  // Gracefully serve the high-fidelity mock legal whitepapers offline/fallback
  return MOCK_INSIGHTS;
}

export async function getInsightBySlug(slug: string): Promise<LegalInsight | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "insight" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        category,
        summary,
        date,
        readingTime,
        author,
        authorTitle,
        content,
        goldQuote,
        goldQuoteAuthor
      }`;
      const post = await sanityClient.fetch(query, { slug });
      if (post) return post;
    } catch (error) {
      console.warn("Sanity detail fetch failed, falling back to local search.", error);
    }
  }

  // Local fallback lookup
  const localPost = MOCK_INSIGHTS.find((p) => p.slug === slug);
  return localPost || null;
}
