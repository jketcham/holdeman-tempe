import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const STATION_URL = 'https://api.weather.gov/stations/KPHX/observations/latest';

export const GET: RequestHandler = async () => {
	try {
		const response = await fetch(STATION_URL, {
			headers: {
				'User-Agent': '(Holdeman Neighborhood Association, info@holdemantempe.org)'
			}
		});
		const data = await response.json();

		return json({
			temperature: data.properties.temperature.value,
			conditions: data.properties.textDescription,
			timestamp: data.properties.timestamp
		});
	} catch (error) {
		console.error('Failed to fetch weather:', error);
		return json({ error: 'Failed to fetch weather data' }, { status: 500 });
	}
};
