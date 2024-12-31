import type { Link, BannerUpdate } from './types';
import type { D1Database } from '@cloudflare/workers-types';

const ACTIVE_LINKS_QUERY = `
	SELECT * FROM links
	WHERE 
		(start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
		AND (end_date IS NULL OR end_date > CURRENT_TIMESTAMP)
	ORDER BY "order" ASC, created_at DESC;
`;

const LATEST_BANNER_QUERY = `
	SELECT * FROM banner_updates
	WHERE 
		(start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
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
