import { env } from "cloudflare:workers";
import type { LayoutServerLoad } from "./$types";
import { fetchWeather } from "#lib/weather.js";
import { getNextEvent } from "#lib/db.js";

export const load: LayoutServerLoad = async () => {
  if (!env.DB) {
    throw new Error("Database not available");
  }

  try {
    const [weather, nextEvent] = await Promise.all([fetchWeather(), getNextEvent(env.DB)]);

    return {
      weather,
      nextEvent,
    };
  } catch (error) {
    console.error("Error loading layout data:", error);
    return {
      weather: null,
      nextEvent: null,
    };
  }
};
