import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { env } from "$env/dynamic/private";

const protectAdminRoutes: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === "/admin/login") {
    return resolve(event);
  }

  if (event.url.pathname.startsWith("/admin")) {
    const session = event.cookies.get("admin_session");

    if (!session || session !== env.ADMIN_SESSION_SECRET) {
      throw redirect(303, "/admin/login");
    }
  }

  return resolve(event);
};

export const handle = sequence(protectAdminRoutes);
