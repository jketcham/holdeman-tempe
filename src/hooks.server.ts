import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { env } from "$env/dynamic/private";
import { securityHeaders } from "$lib/config/security";

const securityMiddleware: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Add non-CSP security headers
  Object.entries(securityHeaders).forEach(([header, value]) => {
    response.headers.set(header, value);
  });

  return response;
};

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

export const handle = sequence(securityMiddleware, protectAdminRoutes);
