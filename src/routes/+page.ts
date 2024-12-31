import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/latest-banner');
		if (!response.ok) {
			return { bannerData: null };
		}

		const bannerData = await response.json();
		return { bannerData };
	} catch (error) {
		console.error('Failed to fetch banner data:', error);
		return { bannerData: null };
	}
};
