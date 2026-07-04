import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CATEGORIES = [
  "Automation & Industrial Safety",
  "Energy & Smart Grids",
  "Digital Twins & AI",
  "Electronics / RF / Space",
] as const;

type Project = {
  title: string;
  category: (typeof CATEGORIES)[number];
  summary: string;
  tags: string[];
  link?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AS/RS Codesys",
    category: "Automation & Industrial Safety",
    summary: "Automated storage/retrieval system programmed in Codesys 3.5 with ST and GRAFCET.",
    tags: ["Codesys", "ST", "GRAFCET"],
    link: "https://github.com/",
  },
  {
    title: "Li-ion Battery Digital Twin",
    category: "Digital Twins & AI",
    summary: "Live Streamlit digital twin of a Li-ion battery cell with state estimation.",
    tags: ["Python", "Streamlit", "Simulation"],
  },
  {
    title: "B747 Flight Controller",
    category: "Electronics / RF / Space",
    summary: "Longitudinal flight control design and simulation for a Boeing 747 model.",
    tags: ["Control", "MATLAB", "Aerospace"],
  },
  {
    title: "Airport Radar PCB",
    category: "Electronics / RF / Space",
    summary: "RF front-end and PCB design for an airport primary surveillance radar demo.",
    tags: ["RF", "PCB", "Radar"],
  },
];

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "Return Birane Diaw's engineering projects, optionally filtered by category.",
  inputSchema: {
    category: z
      .enum(CATEGORIES)
      .optional()
      .describe("Optional category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category ? PROJECTS.filter((p) => p.category === category) : PROJECTS;
    return { content: [{ type: "text", text: JSON.stringify(items) }] };
  },
});
