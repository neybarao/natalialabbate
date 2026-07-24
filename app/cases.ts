export type Case = {
  slug: string;
  number: string;
  title: string;
  tag: string;
  year: string;
  summary: string;
  role: string;
  scope: string;
  team: string;
  timeline: string;
};

export const CASES: Case[] = [
  {
    slug: "case-01",
    number: "01",
    title: "Case Study 01",
    tag: "Healthcare",
    year: "2024",
    summary:
      "Placeholder summary — replace with the real problem statement, users, and outcome for this project.",
    role: "Senior Product Designer",
    scope: "Discovery · UX · UI · Design System",
    team: "Design, Product, Engineering",
    timeline: "12 weeks",
  },
  {
    slug: "case-02",
    number: "02",
    title: "Case Study 02",
    tag: "Financial Services",
    year: "2024",
    summary:
      "Placeholder summary — replace with the real problem statement, users, and outcome for this project.",
    role: "Senior Product Designer",
    scope: "Strategy · UX · UI",
    team: "Design, Product, Engineering",
    timeline: "16 weeks",
  },
  {
    slug: "case-03",
    number: "03",
    title: "Case Study 03",
    tag: "AI · Real Estate",
    year: "2023",
    summary:
      "Placeholder summary — replace with the real problem statement, users, and outcome for this project.",
    role: "Senior Product Designer",
    scope: "Research · UX · UI · Handoff",
    team: "Design, Product, Engineering, Data",
    timeline: "20 weeks",
  },
];
