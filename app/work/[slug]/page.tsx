import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../site-header";
import { CASES, type CaseSection } from "../../cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return {};
  const description = c.tagline ?? `${c.title} — case study by Natalia L'Abbate.`;
  return {
    title: c.title,
    description,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: `${c.title} · Natalia L'Abbate`,
      description,
      url: `/work/${c.slug}`,
      type: "article",
    },
  };
}

function Section({ section }: { section: CaseSection }) {
  return (
    <section className="case-section reveal">
      <h2>{section.heading}</h2>
      {section.paragraphs?.map((p, i) => (
        <p key={`p-${i}`}>{p}</p>
      ))}
      {section.bullets && (
        <ul className="case-list">
          {section.bullets.map((b, i) => (
            <li key={`b-${i}`}>{b}</li>
          ))}
        </ul>
      )}
      {section.subsections?.map((sub, i) => (
        <div className="case-sub" key={`sub-${i}`}>
          {sub.heading && <h3>{sub.heading}</h3>}
          {sub.paragraphs?.map((p, pi) => (
            <p key={`sp-${pi}`}>{p}</p>
          ))}
          {sub.bullets && (
            <ul className="case-list">
              {sub.bullets.map((b, bi) => (
                <li key={`sb-${bi}`}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
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
            {c.number} · {c.client ?? c.tag} · {c.year}
          </div>
          <h1 className="case-title">{c.title}</h1>
          {c.tagline && <p className="case-summary">{c.tagline}</p>}
          {c.disclaimer && <p className="case-disclaimer">{c.disclaimer}</p>}

          <dl className="case-meta">
            <div>
              <dt className="case-meta__label">Role</dt>
              <dd className="case-meta__value">{c.role}</dd>
            </div>
            <div>
              <dt className="case-meta__label">Industry</dt>
              <dd className="case-meta__value">{c.industry}</dd>
            </div>
            <div>
              <dt className="case-meta__label">Duration</dt>
              <dd className="case-meta__value">{c.duration}</dd>
            </div>
            <div>
              <dt className="case-meta__label">Tools</dt>
              <dd className="case-meta__value">
                {c.tools?.length ? c.tools.join(" · ") : "—"}
              </dd>
            </div>
          </dl>

          {c.tags && c.tags.length > 0 && (
            <div className="case-tags" aria-label="Disciplines">
              {c.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="case-hero-media reveal" aria-hidden />

          {c.goals && c.goals.length > 0 && (
            <section className="case-goals reveal" aria-labelledby="goals-title">
              <h2 id="goals-title">Product goals</h2>
              <ol className="case-goals-list">
                {c.goals.map((g, i) => (
                  <li key={i}>
                    <span className="case-goals-num mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{g}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {c.sections && c.sections.length > 0 && (
            <div className="case-body">
              {c.sections.map((s, i) => (
                <Section key={i} section={s} />
              ))}
            </div>
          )}

          {c.results && c.results.length > 0 && (
            <section className="case-results reveal" aria-labelledby="results-title">
              <h2 id="results-title">Results</h2>
              <ul className="case-results-list">
                {c.results.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {c.testimonials && c.testimonials.length > 0 && (
            <section className="case-quotes reveal" aria-labelledby="quotes-title">
              <h2 id="quotes-title">What the team said</h2>
              <div className="case-quote-grid">
                {c.testimonials.map((t, i) => (
                  <figure key={i} className="case-quote">
                    <blockquote>
                      <p>&ldquo;{t.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption>
                      <span className="case-quote__author">{t.author}</span>
                      {t.role && (
                        <span className="case-quote__role"> · {t.role}</span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {(!c.sections || c.sections.length === 0) && (
            <div className="case-body">
              <p className="case-empty">
                Full case content coming soon. Reach out if you&apos;d like the
                deck in the meantime.
              </p>
            </div>
          )}

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
