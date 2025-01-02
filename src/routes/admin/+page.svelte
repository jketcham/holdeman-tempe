<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-6xl mx-auto p-6">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-2xl font-bold">Admin Dashboard</h1>
		<form method="POST" action="/admin/logout">
			<button type="submit" class="text-red-600 hover:text-red-800">Logout</button>
		</form>
	</div>

	<div class="grid md:grid-cols-2 gap-8">
		<!-- Banner Updates Section -->
		<div class="bg-white p-6 rounded-lg shadow">
			<h2 class="text-xl font-bold mb-4">Banner Updates</h2>
			<!-- Add banner form here -->
		</div>

		<!-- Links Section -->
		<div class="bg-white p-6 rounded-lg shadow">
			<h2 class="text-xl font-bold mb-4">Links</h2>
			<!-- Add links form here -->
		</div>

		<!-- Link Stats Section -->
		<div class="bg-white p-6 rounded-lg shadow md:col-span-2">
			<h2 class="text-xl font-bold mb-4">Link Statistics</h2>
			<!-- Add stats table here -->
		</div>
	</div>
</div>
