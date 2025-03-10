import type { Link, BannerUpdate, LinkStats, Event } from "./types";
import type { D1Database } from "@cloudflare/workers-types";

const ACTIVE_LINKS_QUERY = `
	SELECT * FROM links
	WHERE 
		deleted_at IS NULL
		AND (start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
		AND (end_date IS NULL OR end_date > CURRENT_TIMESTAMP)
	ORDER BY "order" ASC, created_at DESC;
`;

const LATEST_BANNER_QUERY = `
	SELECT * FROM banner_updates
	WHERE 
		deleted_at IS NULL
		AND (start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
		AND (end_date IS NULL OR end_date > CURRENT_TIMESTAMP)
	ORDER BY created_at DESC
	LIMIT 1;
`;

export async function getActiveLinks(db: D1Database) {
  const results = await db.prepare(ACTIVE_LINKS_QUERY).all<Link>();
  return results.results;
}

export async function getLatestBanner(db: D1Database) {
  const result = await db.prepare(LATEST_BANNER_QUERY).first<BannerUpdate>();
  return result || null;
}

export async function createLinkEvent(
  db: D1Database,
  {
    link_id,
    ip_address,
    user_agent,
  }: {
    link_id: number;
    ip_address: string;
    user_agent: string;
  },
) {
  return await db
    .prepare(`INSERT INTO link_events (link_id, ip_address, user_agent) VALUES (?, ?, ?)`)
    .bind(link_id, ip_address, user_agent)
    .run();
}

export async function createBannerUpdate(
  db: D1Database,
  data: Omit<BannerUpdate, "id" | "created_at" | "updated_at">,
) {
  return await db
    .prepare(
      `
			INSERT INTO banner_updates (title, content, link_url, link_label, start_date, end_date)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
    )
    .bind(data.title, data.content, data.link_url, data.link_label, data.start_date, data.end_date)
    .run();
}

export async function createLink(
  db: D1Database,
  data: Omit<Link, "id" | "created_at" | "updated_at">,
) {
  return await db
    .prepare(
      `
			INSERT INTO links (link_url, link_label, "order", start_date, end_date)
			VALUES (?, ?, ?, ?, ?)
		`,
    )
    .bind(data.link_url, data.link_label, data.order, data.start_date, data.end_date)
    .run();
}

export async function getLinkStats(db: D1Database) {
  return await db
    .prepare(
      `
			SELECT 
				l.id,
				l.link_label,
				l.link_url,
				COUNT(le.id) as click_count,
				MAX(le.event_timestamp) as last_clicked
			FROM links l
			LEFT JOIN link_events le ON l.id = le.link_id
			WHERE l.deleted_at IS NULL
			GROUP BY l.id
			ORDER BY click_count DESC
		`,
    )
    .all<LinkStats>();
}

export async function getLinks(db: D1Database, page = 1, perPage = 10) {
  const offset = (page - 1) * perPage;
  const results = await db
    .prepare(
      `
		SELECT * FROM links
		WHERE deleted_at IS NULL
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`,
    )
    .bind(perPage, offset)
    .all<Link>();

  const total = await db
    .prepare("SELECT COUNT(*) as count FROM links WHERE deleted_at IS NULL")
    .first<{ count: number }>();

  return {
    links: results.results,
    totalPages: Math.ceil((total?.count || 0) / perPage),
  };
}

export async function getBannerUpdates(db: D1Database, page = 1, perPage = 10) {
  const offset = (page - 1) * perPage;
  const results = await db
    .prepare(
      `
		SELECT * FROM banner_updates
		WHERE deleted_at IS NULL
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`,
    )
    .bind(perPage, offset)
    .all<BannerUpdate>();

  const total = await db
    .prepare("SELECT COUNT(*) as count FROM banner_updates WHERE deleted_at IS NULL")
    .first<{ count: number }>();

  return {
    bannerUpdates: results.results,
    totalPages: Math.ceil((total?.count || 0) / perPage),
  };
}

export async function deleteLink(db: D1Database, id: number) {
  return await db
    .prepare("UPDATE links SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(id)
    .run();
}

export async function deleteBannerUpdate(db: D1Database, id: number) {
  return await db
    .prepare("UPDATE banner_updates SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(id)
    .run();
}

export async function updateLink(
  db: D1Database,
  id: number,
  data: Partial<Omit<Link, "id" | "created_at" | "updated_at">>,
) {
  const sets = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");
  const query = `UPDATE links SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return await db
    .prepare(query)
    .bind(...Object.values(data), id)
    .run();
}

export async function updateBannerUpdate(
  db: D1Database,
  id: number,
  data: Partial<Omit<BannerUpdate, "id" | "created_at" | "updated_at">>,
) {
  const sets = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");
  const query = `UPDATE banner_updates SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return await db
    .prepare(query)
    .bind(...Object.values(data), id)
    .run();
}

export async function getEvents(db: D1Database, page = 1, perPage = 10) {
  const offset = (page - 1) * perPage;
  const results = await db
    .prepare(
      `
      SELECT * FROM events
      WHERE deleted_at IS NULL
      ORDER BY start_date DESC
      LIMIT ? OFFSET ?
    `,
    )
    .bind(perPage, offset)
    .all<Event>();

  const total = await db
    .prepare("SELECT COUNT(*) as count FROM events WHERE deleted_at IS NULL")
    .first<{ count: number }>();

  return {
    events: results.results,
    totalPages: Math.ceil((total?.count || 0) / perPage),
  };
}

export async function createEvent(
  db: D1Database,
  data: Omit<Event, "id" | "created_at" | "updated_at" | "deleted_at">,
) {
  return await db
    .prepare(
      `
      INSERT INTO events (type, name, description, start_date, end_date, slug, location)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    )
    .bind(
      data.type,
      data.name,
      data.description,
      data.start_date,
      data.end_date,
      data.slug,
      data.location,
    )
    .run();
}

export async function updateEvent(
  db: D1Database,
  id: number,
  data: {
    type: "meeting" | "event";
    name: string;
    description: string;
    location: string | null;
    slug: string;
    start_date: string;
    end_date: string | null;
  },
) {
  const sets = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");
  const query = `UPDATE events SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return await db
    .prepare(query)
    .bind(...Object.values(data), id)
    .run();
}

export async function deleteEvent(db: D1Database, id: number) {
  return await db
    .prepare("UPDATE events SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(id)
    .run();
}

export async function getNextEvent(db: D1Database) {
  const result = await db
    .prepare(
      `SELECT * FROM events 
       WHERE start_date > datetime('now') 
       AND deleted_at IS NULL 
       ORDER BY start_date ASC 
       LIMIT 1`,
    )
    .first<Event>();
  return result || null;
}
