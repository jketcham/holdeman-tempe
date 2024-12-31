<script lang="ts">
	import Weather from './Weather.svelte';
	import Container from './Container.svelte';

	export let initialWeather: { temperature: number; conditions: string } | null = null;
</script>

<div class="flex flex-col">
	<div class="bg-holdeman">
		<Container>
			<Weather {initialWeather} />
			<a href="/">
				<div class="flex justify-between py-5 md:py-8 uppercase font-display">
					<div class="flex flex-col flex-shrink">
						<span class="block text-2xl md:text-5xl font-bold md:mb-2">Holdeman</span>
						<span class="block text-lg md:text-2xl font-bold">Neighborhood</span>
						<span class="block text-lg md:text-2xl font-bold">Association</span>
					</div>
					<div class="flex flex-col text-right flex-shrink-0">
						<span class="block text-lg md:text-2xl font-bold mt-auto md:mb-2">Est. 1998</span>
						<span class="block text-xs md:text-xl">holdemantempe.org</span>
					</div>
				</div>
			</a>
		</Container>
	</div>
</div>
