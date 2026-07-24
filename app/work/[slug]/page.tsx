import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../site-header";
import { CASES } from "../../cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: `${c.title} · Natalia L'Abbate`,
      description: c.summary,
      url: `/work/${c.slug}`,
      type: "article",
    },
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const idx = CASES.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const c = CASES[idx];
  const prev = CASES[(idx - 1 + CASES.length) % CASES.length];
  const next = CASES[(idx + 1) % CASES.length];

  return (
    <>
      <SiteHeader />
      <main className="page">
        <article className="case container">
          <Link href="/#work" className="case-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to work
          </Link>

          <div className="case-tag mono">
            {c.number} · {c.tag} · {c.year}
          </div>
          <h1 className="case-title">{c.title}</h1>
          <p className="case-summary">{c.summary}</p>

          <dl className="case-meta">
            <div>
              <dt className="case-meta__label">Role</dt>
              <dd className="case-meta__value">{c.role}</dd>
            </div>
            <div>
              <dt className="case-meta__label">Scope</dt>
              <dd className="case-meta__value">{c.scope}</dd>
            </div>
            <div>
              <dt className="case-meta__label">Team</dt>
              <dd className="case-meta__value">{c.team}</dd>
            </div>
            <div>
              <dt className="case-meta__label">Timeline</dt>
              <dd className="case-meta__value">{c.timeline}</dd>
            </div>
          </dl>

          <div className="case-hero-media reveal" aria-hidden />

          <div className="case-body">
            <section className="reveal">
              <h2>Context</h2>
              <p>
                Placeholder — describe the business context, the users, and the
                constraints. What was happening in the market, what did the team
                know, and what did they need to learn?
              </p>
            </section>
            <section className="reveal">
              <h2>Problem</h2>
              <p>
                Placeholder — frame the specific problem you were solving and
                why it mattered. Include the initial hypothesis and how you
                validated it.
              </p>
            </section>
            <section className="reveal">
              <h2>Process</h2>
              <p>
                Placeholder — walk through discovery, research methods,
                wireframes, prototypes, and any pivots. Show artefacts and
                decisions along the way.
              </p>
            </section>
            <section className="reveal">
              <h2>Outcome</h2>
              <p>
                Placeholder — what shipped, what changed for users, and what
                metrics moved. Include quotes, screenshots, and next steps if
                the project continued.
              </p>
            </section>
          </div>

          <nav className="case-nav" aria-label="Case navigation">
            <Link href={`/work/${prev.slug}`}>← {prev.title}</Link>
            <Link href={`/work/${next.slug}`}>{next.title} →</Link>
          </nav>
        </article>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Natalia L&apos;Abbate</span>
        <Link href="/#contact">Get in touch</Link>
      </footer>
    </>
  );
}
