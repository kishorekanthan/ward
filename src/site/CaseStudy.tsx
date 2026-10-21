import type { ReactNode } from "react";
import { FactList, type Fact } from "./FactList";
import { LinkList, type LinkItem } from "./LinkList";
import { PageIntro } from "./PageIntro";
import { Prose } from "./Prose";
import { SplitLayout } from "./SplitLayout";
import { Tag } from "./Tag";
import s from "./CaseStudy.module.css";

export type CaseStudyProps = {
  title: string;
  summary: ReactNode;
  children: ReactNode;
  eyebrow?: string;
  eyebrowHref?: string;
  role?: string;
  period?: string;
  focus?: string[];
  stack?: string[];
  related?: LinkItem[];
};

type FactSource = [term: string, value: string | string[] | undefined];

function TagRow({ labels }: { labels: string[] }) {
  return (
    <span className={s.tags}>
      {labels.map((label) => (
        <Tag key={label} label={label} />
      ))}
    </span>
  );
}

function present(source: FactSource): source is [string, string | string[]] {
  return source[1] !== undefined && source[1].length > 0;
}

// Drops a missing or empty fact; a list of labels becomes a row of tags.
export function factsFrom(sources: FactSource[]): Fact[] {
  return sources.filter(present).map(([term, value]) => ({
    term,
    value: typeof value === "string" ? value : <TagRow labels={value} />,
  }));
}

type PageBodyProps = { facts: Fact[]; links?: LinkItem[]; linksLabel: string; asideLabel: string; children: ReactNode };

function Aside({ facts, links, linksLabel }: Omit<PageBodyProps, "children" | "asideLabel">) {
  return (
    <div className={s.aside}>
      {facts.length === 0 ? null : <FactList facts={facts} />}
      {links === undefined || links.length === 0 ? null : <LinkList label={linksLabel} links={links} />}
    </div>
  );
}

// The body in prose, with an aside of facts and links only when there is one to show.
export function PageBody({ facts, links = [], linksLabel, asideLabel, children }: PageBodyProps) {
  if (facts.length === 0 && links.length === 0) return <Prose>{children}</Prose>;
  return (
    <SplitLayout asideLabel={asideLabel} aside={<Aside facts={facts} links={links} linksLabel={linksLabel} />}>
      <Prose>{children}</Prose>
    </SplitLayout>
  );
}

// A case study page from frontmatter-shaped props: intro, body, and an aside of facts and related links.
export function CaseStudy({ title, summary, children, eyebrow, eyebrowHref, role, period, focus, stack, related }: CaseStudyProps) {
  const facts = factsFrom([
    ["Role", role],
    ["Period", period],
    ["Focus", focus],
    ["Stack", stack],
  ]);
  return (
    <article className={s.page}>
      <PageIntro title={title} lead={summary} eyebrow={eyebrow} eyebrowHref={eyebrowHref} />
      <PageBody facts={facts} links={related} linksLabel="Related" asideLabel="Case study facts">
        {children}
      </PageBody>
    </article>
  );
}
