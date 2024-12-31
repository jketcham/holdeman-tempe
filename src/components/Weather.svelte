<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	export let initialWeather: { temperature: number; conditions: string } | null =
		$page.data.weather;

	let temperature: number | null = initialWeather?.temperature ?? null;
	let conditions: string | null = initialWeather?.conditions ?? null;
	let currentTime = new Date();

	function celsiusToFahrenheit(celsius: number): number {
		return (celsius * 9) / 5 + 32;
	}

	function formatTime(date: Date): string {
		const time = new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			timeZone: 'America/Phoenix'
		}).format(date);

		const date_str = new Intl.DateTimeFormat('en-US', {
			weekday: 'long',
			month: 'short',
			day: 'numeric',
			timeZone: 'America/Phoenix'
		}).format(date);

		return `${time} on ${date_str}`;
	}

	async function fetchWeather() {
		try {
			const response = await fetch('/api/weather');
			if (response.ok) {
				const data = await response.json();
				temperature = data.temperature;
				conditions = data.conditions;
			}
		} catch (error) {
			console.error('Failed to fetch weather:', error);
		}
	}

	// Update time every second
	const timeInterval = setInterval(() => {
		currentTime = new Date();
	}, 1000);

	onMount(() => {
		// Update weather every 5 minutes
		const weatherInterval = setInterval(fetchWeather, 5 * 60 * 1000);
		return () => clearInterval(weatherInterval);
	});

	onDestroy(() => {
		clearInterval(timeInterval);
	});

	$: formattedTemp =
		temperature !== null ? `${Math.round(celsiusToFahrenheit(temperature))}°F` : '--';
	$: localTime = formatTime(currentTime);
</script>

<div class="text-sm mt-2 flex flex-col md:flex-row md:items-center border-b border-black pb-1">
	<span class="font-medium">{localTime}</span>
	{#if temperature !== null && conditions}
		<span class="hidden md:inline mx-2">•</span>
		<span>It's {formattedTemp} and {conditions.toLowerCase()} in Holdeman</span>
	{/if}
</div>
