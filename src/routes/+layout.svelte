<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Container from '../components/Container.svelte';

	export let data;
</script>

<Navbar initialWeather={data.weather} />

<slot />

<style>
	:global(html) {
		height: 100%;
	}

	:global(body) {
		height: 100%;
	}
</style>
