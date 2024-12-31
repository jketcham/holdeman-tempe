<script lang="ts">
	import Container from './Container.svelte';
	const year = new Date().getFullYear();
</script>

<footer class="mt-auto">
	<Container>
		<div class="border-t border-neutral-200 py-8 text-sm">
			<div class="text-center text-gray-600">
				<p>&copy; {year} Holdeman Neighborhood Association</p>
			</div>
		</div>
	</Container>
</footer>

<style>
	footer {
		width: 100%;
	}
</style>
