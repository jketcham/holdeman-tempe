<script>
	import Container from '../components/Container.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - Holdeman Neighborhood Association</title>
</svelte:head>

<main class="py-16">
	<Container>
		<div class="flex flex-col items-center text-center">
			<h1 class="mb-4 font-display text-6xl font-bold">{$page.status}</h1>
			<p class="mb-8 text-xl text-neutral-600">{$page.error?.message || 'Page not found'}</p>

			<a
				href="/"
				class="rounded bg-holdeman-400 px-6 py-3 font-bold text-inherit no-underline transition hover:bg-holdeman-500"
			>
				Return Home
			</a>
		</div>
	</Container>
</main>

<style>
	a {
		cursor: pointer;
	}
</style>
