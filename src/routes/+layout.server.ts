import type { LayoutServerLoad } from "./$types";
import { fetchWeather } from "$lib/weather";
import { getNextEvent } from "$lib/db";

export const load: LayoutServerLoad = async ({ platform }) => {
  if (!platform?.env?.DB) {
    throw new Error("Database not available");
  }

  try {
    const [weather, nextEvent] = await Promise.all([fetchWeather(), getNextEvent(platform.env.DB)]);

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
