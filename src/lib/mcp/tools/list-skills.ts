import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CATEGORIES = [
  "Automation & Industrial Safety",
  "Energy & Smart Grids",
  "Digital Twins & AI",
  "Electronics / RF / Space",
] as const;

const SKILLS: Record<string, string[]> = {
  "Automation & Industrial Safety": [
    "TIA Portal",
    "Codesys 3.5",
    "GRAFCET IEC 60848",
    "IEC 61511",
    "SCL",
    "LADDER",
    "ST",
  ],
  "Energy & Smart Grids": ["Power systems", "Smart grid simulation", "Li-ion battery modeling"],
  "Digital Twins & AI": ["Python", "Streamlit", "Machine learning", "Simulation"],
  "Electronics / RF / Space": ["PCB design", "RF systems", "Radar", "Flight control"],
};

export default defineTool({
  name: "list_skills",
  title: "List technical skills",
  description: "Return Birane Diaw's technical skills, optionally filtered by category.",
  inputSchema: {
    category: z
      .enum(CATEGORIES)
      .optional()
      .describe("Optional category to filter skills by."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const payload = category ? { [category]: SKILLS[category] } : SKILLS;
    return { content: [{ type: "text", text: JSON.stringify(payload) }] };
  },
});
