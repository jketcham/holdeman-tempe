import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	const { DB } = platform?.env ?? {};

	if (!DB) {
		return json({ error: 'Database not available' }, { status: 500 });
	}

	const now = new Date().toISOString();
	const result = await DB.prepare(
		`SELECT * FROM banner_updates
     WHERE 
        (start_date <= ? AND (end_date IS NULL OR end_date > ?))
     ORDER BY created_at DESC
     LIMIT 1;
    `
	)
		.bind(now, now)
		.first();

	if (!result) {
		return json({ error: 'No active banner updates found' }, { status: 404 });
	}

	// Transform the data to match our component props
	const transformedData = {
		title: result.title,
		description: result.content,
		link_url: result.link_url,
		link_text: result.link_label,
		updatedAt: result.updated_at
	};

	return json(transformedData);
};
