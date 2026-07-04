import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listSkills from "./tools/list-skills";
import listProjects from "./tools/list-projects";
import listTestimonials from "./tools/list-testimonials";

export default defineMcp({
  name: "birane-diaw-portfolio",
  title: "Birane Diaw Portfolio",
  version: "0.1.0",
  instructions:
    "Public tools for Birane Diaw's engineering portfolio. Use get_profile for a bio, list_skills and list_projects (optionally filtered by category) for technical work, and list_testimonials for public feedback.",
  tools: [getProfile, listSkills, listProjects, listTestimonials],
});
