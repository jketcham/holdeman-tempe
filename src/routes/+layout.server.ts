import type { LayoutServerLoad } from './$types';
import { fetchWeather } from '$lib/weather';

export const load: LayoutServerLoad = async () => {
	const weather = await fetchWeather();
	return { weather };
};
