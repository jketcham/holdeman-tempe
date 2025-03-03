import type { PageServerLoad } from "./$types";
import { getActiveLinks, getLatestBanner } from "$lib/db";
import { getAllProjects } from "$lib/projects";

export const load: PageServerLoad = async ({ platform }) => {
  // Get the current project
  const projects = getAllProjects();
  const currentProject = projects.find((project) => project.current);

  if (!platform?.env?.DB) {
    console.error("Database not available");
    return { bannerData: null, links: [], currentProject };
  }

  try {
    const [bannerData, links] = await Promise.all([
      getLatestBanner(platform.env.DB),
      getActiveLinks(platform.env.DB),
    ]);

    return { bannerData, links, currentProject };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { bannerData: null, links: [], currentProject };
  }
};
