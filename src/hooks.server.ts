import { redirect } from "@sveltejs/kit";
import { sequence, type Handle } from "@sveltejs/kit/hooks";
import { ADMIN_SESSION_SECRET } from "$app/env/private";
import { securityHeaders } from "#lib/config/security.js";

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

    if (!ADMIN_SESSION_SECRET || !session || session !== ADMIN_SESSION_SECRET) {
      throw redirect(303, "/admin/login");
    }
  }

  return resolve(event);
};

export const handle = sequence(securityMiddleware, protectAdminRoutes);
