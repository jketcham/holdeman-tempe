import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { toSQLiteDateTime } from "$lib/utils/dates";
import {
  createBannerUpdate,
  createLink,
  deleteBannerUpdate,
  deleteLink,
  getLinks,
  getBannerUpdates,
  getLinkStats,
  updateBannerUpdate,
  updateLink,
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "$lib/db";

export const load: PageServerLoad = async ({ platform, depends, url }) => {
  if (!platform?.env?.DB) {
    throw new Error("Database not available");
  }

  depends("app:links");
  depends("app:banners");
  depends("app:events");

  const bannerPage = parseInt(url.searchParams.get("bannerPage") || "1");
  const linkPage = parseInt(url.searchParams.get("linkPage") || "1");
  const eventPage = parseInt(url.searchParams.get("eventPage") || "1");

  const [links, bannerUpdates, linkStats, events] = await Promise.all([
    getLinks(platform.env.DB, linkPage),
    getBannerUpdates(platform.env.DB, bannerPage),
    getLinkStats(platform.env.DB),
    getEvents(platform.env.DB, eventPage),
  ]);

  return { links, bannerUpdates, linkStats, events };
};

export const actions: Actions = {
  createBanner: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const link_url = data.get("link_url") as string | null;
    const link_label = data.get("link_label") as string | null;
    const start_date = data.get("start_date") as string | null;
    const end_date = data.get("end_date") as string | null;

    if (!title || !content) {
      return fail(400, { message: "Title and content are required" });
    }

    await createBannerUpdate(platform.env.DB, {
      title,
      content,
      link_url,
      link_label,
      start_date: start_date ? toSQLiteDateTime(start_date) : null,
      end_date: end_date ? toSQLiteDateTime(end_date) : null,
    });

    return { success: true };
  },

  createLink: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const link_url = data.get("link_url") as string;
    const link_label = data.get("link_label") as string;
    const order = parseInt(data.get("order") as string);
    const start_date = data.get("start_date") as string | null;
    const end_date = data.get("end_date") as string | null;

    if (!link_url || !link_label || isNaN(order)) {
      return fail(400, { message: "URL, label, and order are required" });
    }

    await createLink(platform.env.DB, {
      link_url,
      link_label,
      order,
      start_date: start_date ? toSQLiteDateTime(start_date) : null,
      end_date: end_date ? toSQLiteDateTime(end_date) : null,
    });

    return { success: true };
  },

  updateBanner: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const id = parseInt(data.get("id") as string);
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const link_url = data.get("link_url") as string | null;
    const link_label = data.get("link_label") as string | null;
    const start_date = data.get("start_date") as string | null;
    const end_date = data.get("end_date") as string | null;

    if (!id || !title || !content) {
      return fail(400, { message: "ID, title, and content are required" });
    }

    await updateBannerUpdate(platform.env.DB, id, {
      title,
      content,
      link_url,
      link_label,
      start_date: start_date ? toSQLiteDateTime(start_date) : null,
      end_date: end_date ? toSQLiteDateTime(end_date) : null,
    });

    return { success: true };
  },

  updateLink: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const id = parseInt(data.get("id") as string);
    const link_url = data.get("link_url") as string;
    const link_label = data.get("link_label") as string;
    const order = parseInt(data.get("order") as string);
    const start_date = data.get("start_date") as string | null;
    const end_date = data.get("end_date") as string | null;

    if (!id || !link_url || !link_label || isNaN(order)) {
      return fail(400, { message: "ID, URL, label, and order are required" });
    }

    await updateLink(platform.env.DB, id, {
      link_url,
      link_label,
      order,
      start_date: start_date ? toSQLiteDateTime(start_date) : null,
      end_date: end_date ? toSQLiteDateTime(end_date) : null,
    });

    return { success: true };
  },

  deleteBanner: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const id = parseInt(data.get("id") as string);

    if (!id) {
      return fail(400, { message: "ID is required" });
    }

    await deleteBannerUpdate(platform.env.DB, id);
    return { success: true };
  },

  deleteLink: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const id = parseInt(data.get("id") as string);

    if (!id) {
      return fail(400, { message: "ID is required" });
    }

    await deleteLink(platform.env.DB, id);
    return { success: true };
  },

  createEvent: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const type = data.get("type") as "meeting" | "event";
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const location = data.get("location")?.toString() || null;
    const slug = data.get("slug") as string;
    const start_date = data.get("start_date") as string;
    const end_date = data.get("end_date") as string | null;

    if (!type || !name || !description || !slug || !start_date) {
      return fail(400, { message: "Missing required fields" });
    }

    const sqlStartDate = toSQLiteDateTime(start_date);
    if (!sqlStartDate) {
      return fail(400, { message: "Invalid start date format" });
    }

    await createEvent(platform.env.DB, {
      type,
      name,
      description,
      location,
      slug,
      start_date: sqlStartDate,
      end_date: end_date ? toSQLiteDateTime(end_date) : null,
    });

    return { success: true };
  },

  updateEvent: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const id = parseInt(data.get("id") as string);
    const type = data.get("type") as "meeting" | "event";
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const location = data.get("location")?.toString() || null;
    const slug = data.get("slug") as string;
    const start_date = data.get("start_date") as string;
    const end_date = data.get("end_date") as string | null;

    if (!id || !type || !name || !description || !slug || !start_date) {
      return fail(400, { message: "Missing required fields" });
    }

    const sqlStartDate = toSQLiteDateTime(start_date);
    if (!sqlStartDate) {
      return fail(400, { message: "Invalid start date format" });
    }

    await updateEvent(platform.env.DB, id, {
      type,
      name,
      description,
      location,
      slug,
      start_date: sqlStartDate,
      end_date: end_date ? toSQLiteDateTime(end_date) : null,
    });

    return { success: true };
  },

  deleteEvent: async ({ request, platform }) => {
    if (!platform?.env?.DB) {
      throw error(500, "Database not available");
    }

    const data = await request.formData();
    const id = parseInt(data.get("id") as string);

    if (!id) {
      return fail(400, { message: "ID is required" });
    }

    await deleteEvent(platform.env.DB, id);
    return { success: true };
  },
};
