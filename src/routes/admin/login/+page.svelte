<script lang="ts">
	import { enhance } from '$app/forms';
	let error: string | null = null;
</script>

<div class="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
	<h1 class="text-2xl font-bold mb-6">Admin Login</h1>

	<form
		method="POST"
		use:enhance={() => {
			return ({ result }) => {
				if (result.type === 'failure') {
					error = String(result.data?.error || 'An error occurred');
				}
				if (result.type === 'redirect') {
					window.location.href = result.location;
				}
			};
		}}
	>
		<div class="space-y-4">
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				/>
			</div>

			{#if error}
				<p class="text-red-500 text-sm">{error}</p>
			{/if}

			<button
				type="submit"
				class="w-full bg-holdeman hover:bg-holdeman-600 text-white font-bold py-2 px-4 rounded"
			>
				Login
			</button>
		</div>
	</form>
</div>
