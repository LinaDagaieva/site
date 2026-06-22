export const profile = {
  name: "Lina Dagaieva",
  firstName: "Lina",
  role: "QA Engineer",
  location: "Kyiv, Ukraine",
  email: "lina.dagaieva@gmail.com",
  github: "https://github.com/LinaDagaieva",
  linkedin: "https://www.linkedin.com/in/lina-dagaieva-54b1a5219/",
};

export const taglines = [
  "I find what others miss.",
  "Breaking software before your users do.",
  "Precision is not optional.",
  "Quality is a habit, not a phase.",
];

export const stats = [
  { value: "5+", label: "Years in software QA" },
  { value: "4", label: "Products tested end-to-end" },
  { value: "0", label: "Tolerance for untested code" },
];

export type Track = "education" | "training" | "work";

export interface JourneyEntry {
  track: Track;
  org: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  bullets?: string[];
  description?: string;
}

export const journey: JourneyEntry[] = [
  {
    track: "education",
    org: "Kyiv National University of Technologies and Design",
    role: "Master's Degree, Pharmacy",
    period: "2013 — 2018",
    description:
      "Five years of pharmaceutical training built the foundation everything else stands on: rigorous protocol, exact dosage, zero room for a careless mistake. Turns out that mindset transfers perfectly to software quality.",
  },
  {
    track: "education",
    org: "Mate Academy",
    role: "QA Engineering Course",
    period: "2021",
    description:
      "A full pivot into tech — testing principles, test design techniques, and the fundamentals of manual and exploratory testing, taught fast and applied immediately.",
  },
  {
    track: "training",
    org: "PetStore",
    role: "Software QA Tester",
    period: "2021",
    bullets: [
      "Ad-hoc and exploratory testing",
      "Designed and executed test cases in TestRail",
      "Authored clear, reproducible bug reports",
    ],
  },
  {
    track: "training",
    org: "Conduit",
    role: "Software QA Tester",
    period: "2021",
    location: "Kyiv, Ukraine",
    bullets: [
      "Worked inside a Scrum team end-to-end",
      "Broke down requirements into testable decomposition",
      "Built and ran test cases in TestRail",
      "Logged and tracked defects in JIRA",
      "Wrote test plans and ran exploratory passes",
    ],
  },
  {
    track: "training",
    org: "Joyn.de",
    role: "Software QA Tester",
    period: "2021",
    bullets: [
      "Designed and executed test cases in TestRail",
      "Reported and tracked bugs in JIRA",
      "Collaborated inside a Scrum team",
      "Built a Requirements Traceability Matrix (RTM)",
      "Refined and analyzed incoming requirements",
    ],
  },
  {
    track: "work",
    org: "GroupBWT",
    role: "QA Engineer",
    period: "Aug 2021 — Present",
    current: true,
    description:
      "Five years and counting of owning quality end-to-end — from requirement refinement to test strategy, manual and exploratory execution, and defect reporting that holds up under scrutiny. Comfortable inside Scrum teams, fluent in JIRA and TestRail, and steadily growing into automation.",
  },
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Testing",
    skills: [
      "Manual Testing",
      "Web Testing",
      "Exploratory Testing",
      "Ad-hoc Testing",
      "Test Design Techniques",
      "Regression Testing",
    ],
  },
  {
    label: "Process",
    skills: [
      "Scrum",
      "Test Planning",
      "Requirements Analysis",
      "Decomposition",
      "RTM Creation",
      "Bug Reporting",
    ],
  },
  {
    label: "Tools",
    skills: ["JIRA", "TestRail", "Postman", "GitHub"],
  },
];

export const certifications = [
  {
    name: "Postman Student Expert",
    issuer: "Postman",
  },
];

export interface PortfolioItem {
  title: string;
  description: string;
  tag: string;
}

export const portfolioPlaceholders: PortfolioItem[] = [
  {
    tag: "Case Study",
    title: "Test strategy deep-dive",
    description: "A full breakdown of a test plan, coverage decisions, and the bugs that mattered.",
  },
  {
    tag: "Case Study",
    title: "From requirements to RTM",
    description: "How raw requirements become a traceable, testable matrix — start to finish.",
  },
  {
    tag: "Write-up",
    title: "Manual to automation",
    description: "Notes from the road between manual QA fluency and growing automation skill.",
  },
];
