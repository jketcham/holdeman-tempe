import { env } from "cloudflare:workers";
import { fail, redirect } from "@sveltejs/kit";
import { dev } from "$app/env";
import { ADMIN_PASSWORD, ADMIN_SESSION_SECRET } from "$app/env/private";
import type { Actions } from "./$types";
import { checkRateLimit } from "#lib/rateLimit.js";

export const actions: Actions = {
  default: async ({ cookies, request, getClientAddress }) => {
    const ip = getClientAddress();
    const rateLimit = await checkRateLimit(ip, env.AUTH_STORE);

    if (!rateLimit.allowed) {
      return fail(429, {
        error: `Too many login attempts. Please try again in ${rateLimit.minutesRemaining} minutes.`,
      });
    }

    const data = await request.formData();
    const password = data.get("password");

    if (!ADMIN_PASSWORD || !ADMIN_SESSION_SECRET || password !== ADMIN_PASSWORD) {
      return fail(400, { error: "Invalid password" });
    }

    cookies.set("admin_session", ADMIN_SESSION_SECRET, {
      path: "/",
      httpOnly: true,
      secure: !dev,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    throw redirect(303, "/admin");
  },
};
