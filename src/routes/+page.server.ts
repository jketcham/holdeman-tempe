import { env } from "cloudflare:workers";
import type { PageServerLoad } from "./$types";
import { getActiveLinks, getLatestBanner } from "#lib/db.js";
import { getAllProjects } from "#lib/projects.js";

export const load: PageServerLoad = async () => {
  // Get the current project
  const projects = getAllProjects();
  const currentProject = projects.find((project) => project.current);

  if (!env.DB) {
    console.error("Database not available");
    return { bannerData: null, links: [], currentProject };
  }

  try {
    const [bannerData, links] = await Promise.all([getLatestBanner(env.DB), getActiveLinks(env.DB)]);

    return { bannerData, links, currentProject };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { bannerData: null, links: [], currentProject };
  }
};
