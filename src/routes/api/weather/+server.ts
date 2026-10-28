import type { RequestHandler } from "./$types";
import { fetchWeather } from "#lib/weather.js";

export const GET: RequestHandler = async () => {
  const weather = await fetchWeather();
  if (!weather) {
    return Response.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
  return Response.json(weather);
};
