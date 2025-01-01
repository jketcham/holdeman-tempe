import { json } from '@sveltejs/kit';
import { createLinkEvent } from '$lib/db';

export async function POST({ request, platform, getClientAddress }) {
	const { link_id } = await request.json();

	await createLinkEvent(platform?.env?.DB, {
		link_id,
		ip_address: getClientAddress(),
		user_agent: request.headers.get('user-agent') || ''
	});

	return json({ success: true });
}
