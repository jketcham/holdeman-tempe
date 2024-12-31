import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchWeather } from '$lib/weather';

export const GET: RequestHandler = async () => {
	const weather = await fetchWeather();
	if (!weather) {
		return json({ error: 'Failed to fetch weather data' }, { status: 500 });
	}
	return json(weather);
};
