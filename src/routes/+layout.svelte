<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Container from '../components/Container.svelte';
</script>

<Navbar />

<slot />

<style>
	:global(html) {
		height: 100%;
	}

	:global(body) {
		height: 100%;
	}
</style>
