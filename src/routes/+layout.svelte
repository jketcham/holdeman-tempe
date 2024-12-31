<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="max-w-2xl mx-auto">
	<Navbar />
</div>

<slot />

<style>
	:global(html) {
		height: 100%;
	}

	:global(body) {
		height: 100%;
	}
</style>
