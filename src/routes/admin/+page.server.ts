import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createBannerUpdate,
	createLink,
	deleteBannerUpdate,
	deleteLink,
	getLinks,
	getBannerUpdates,
	getLinkStats,
	updateBannerUpdate,
	updateLink
} from '$lib/db';

export const load: PageServerLoad = async ({ platform, depends }) => {
	if (!platform?.env?.DB) {
		throw new Error('Database not available');
	}

	depends('app:links');
	depends('app:banners');

	const [links, bannerUpdates, linkStats] = await Promise.all([
		getLinks(platform.env.DB),
		getBannerUpdates(platform.env.DB),
		getLinkStats(platform.env.DB)
	]);

	return { links, bannerUpdates, linkStats };
};

export const actions: Actions = {
	createBanner: async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			throw error(500, 'Database not available');
		}

		const data = await request.formData();
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const link_url = data.get('link_url') as string | null;
		const link_label = data.get('link_label') as string | null;
		const start_date = data.get('start_date') as string | null;
		const end_date = data.get('end_date') as string | null;

		if (!title || !content) {
			return fail(400, { message: 'Title and content are required' });
		}

		await createBannerUpdate(platform.env.DB, {
			title,
			content,
			link_url,
			link_label,
			start_date: start_date ? new Date(start_date).toISOString() : null,
			end_date: end_date ? new Date(end_date).toISOString() : null
		});

		return { success: true };
	},

	createLink: async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			throw error(500, 'Database not available');
		}

		const data = await request.formData();
		const link_url = data.get('link_url') as string;
		const link_label = data.get('link_label') as string;
		const order = parseInt(data.get('order') as string);
		const start_date = data.get('start_date') as string | null;
		const end_date = data.get('end_date') as string | null;

		if (!link_url || !link_label || isNaN(order)) {
			return fail(400, { message: 'URL, label, and order are required' });
		}

		await createLink(platform.env.DB, {
			link_url,
			link_label,
			order,
			start_date: start_date ? new Date(start_date).toISOString() : null,
			end_date: end_date ? new Date(end_date).toISOString() : null
		});

		return { success: true };
	},

	updateBanner: async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			throw error(500, 'Database not available');
		}

		const data = await request.formData();
		const id = parseInt(data.get('id') as string);
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const link_url = data.get('link_url') as string | null;
		const link_label = data.get('link_label') as string | null;
		const start_date = data.get('start_date') as string | null;
		const end_date = data.get('end_date') as string | null;

		if (!id || !title || !content) {
			return fail(400, { message: 'ID, title, and content are required' });
		}

		await updateBannerUpdate(platform.env.DB, id, {
			title,
			content,
			link_url,
			link_label,
			start_date: start_date ? new Date(start_date).toISOString() : null,
			end_date: end_date ? new Date(end_date).toISOString() : null
		});

		return { success: true };
	},

	updateLink: async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			throw error(500, 'Database not available');
		}

		const data = await request.formData();
		const id = parseInt(data.get('id') as string);
		const link_url = data.get('link_url') as string;
		const link_label = data.get('link_label') as string;
		const order = parseInt(data.get('order') as string);
		const start_date = data.get('start_date') as string | null;
		const end_date = data.get('end_date') as string | null;

		if (!id || !link_url || !link_label || isNaN(order)) {
			return fail(400, { message: 'ID, URL, label, and order are required' });
		}

		await updateLink(platform.env.DB, id, {
			link_url,
			link_label,
			order,
			start_date: start_date ? new Date(start_date).toISOString() : null,
			end_date: end_date ? new Date(end_date).toISOString() : null
		});

		return { success: true };
	},

	deleteBanner: async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			throw error(500, 'Database not available');
		}

		const data = await request.formData();
		const id = parseInt(data.get('id') as string);

		if (!id) {
			return fail(400, { message: 'ID is required' });
		}

		await deleteBannerUpdate(platform.env.DB, id);
		return { success: true };
	},

	deleteLink: async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			throw error(500, 'Database not available');
		}

		const data = await request.formData();
		const id = parseInt(data.get('id') as string);

		if (!id) {
			return fail(400, { message: 'ID is required' });
		}

		await deleteLink(platform.env.DB, id);
		return { success: true };
	}
};
