import { env } from "cloudflare:workers";
import { createLinkEvent } from "#lib/db.js";

export async function POST({ request, getClientAddress }) {
  const { link_id } = (await request.json()) as { link_id: number };

  await createLinkEvent(env.DB, {
    link_id,
    ip_address: getClientAddress(),
    user_agent: request.headers.get("user-agent") || "",
  });

  return Response.json({ success: true });
}
