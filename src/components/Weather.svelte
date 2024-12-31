<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let temperature: number | null = null;
	let conditions: string | null = null;
	let timestamp: string | null = null;
	let currentTime = new Date();

	function celsiusToFahrenheit(celsius: number): number {
		return (celsius * 9) / 5 + 32;
	}

	function formatTime(date: Date): string {
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			timeZone: 'America/Phoenix'
		});
	}

	async function fetchWeather() {
		try {
			const response = await fetch('/api/weather');
			if (response.ok) {
				const data = await response.json();
				temperature = data.temperature;
				conditions = data.conditions;
				timestamp = data.timestamp;
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
		fetchWeather();
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
	<span class="font-medium">{localTime} MST</span>
	{#if temperature !== null && conditions}
		<span class="hidden md:inline mx-2">•</span>
		<span>It's {formattedTemp} and {conditions.toLowerCase()} in Holdeman</span>
	{/if}
</div>
