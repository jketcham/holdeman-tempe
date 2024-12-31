const STATION_URL = 'https://api.weather.gov/stations/KPHX/observations/latest';
const USER_AGENT = '(Holdeman Neighborhood Association, info@holdemantempe.org)';

export type WeatherData = {
	temperature: number;
	conditions: string;
	timestamp: string;
};

export async function fetchWeather(): Promise<WeatherData | null> {
	try {
		const response = await fetch(STATION_URL, {
			headers: {
				'User-Agent': USER_AGENT
			}
		});
		const data = await response.json();

		return {
			temperature: data.properties.temperature.value,
			conditions: data.properties.textDescription,
			timestamp: data.properties.timestamp
		};
	} catch (error) {
		console.error('Failed to fetch weather:', error);
		return null;
	}
}
