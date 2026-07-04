import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Return Birane Diaw's public profile: name, headline, education, and focus areas.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          name: "Birane Diaw",
          signature: "B. DIAW",
          headline:
            "Engineering student focused on industrial automation, functional safety, energy systems, digital twins, and RF/space electronics.",
          languages: ["English", "French", "Arabic"],
          focus_areas: [
            "Automation & Industrial Safety",
            "Energy & Smart Grids",
            "Digital Twins & AI",
            "Electronics / RF / Space",
          ],
        }),
      },
    ],
  }),
});
