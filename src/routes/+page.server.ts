import type { PageServerLoad } from "./$types";
import { getActiveLinks, getLatestBanner } from "$lib/db";

export const load: PageServerLoad = async ({ platform }) => {
  if (!platform?.env?.DB) {
    console.error("Database not available");
    return { bannerData: null, links: [] };
  }

  try {
    const [bannerData, links] = await Promise.all([
      getLatestBanner(platform.env.DB),
      getActiveLinks(platform.env.DB),
    ]);

    return { bannerData, links };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { bannerData: null, links: [] };
  }
};
