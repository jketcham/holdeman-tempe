<script lang="ts">
	import { enhance } from '$app/forms';
	let error: string | null = null;
</script>

<div class="my-auto p-4 sm:p-6 lg:p-8">
	<div class="mx-auto w-full max-w-md rounded-xl bg-white sm:p-4 sm:shadow-lg md:p-8">
		<h1 class="mb-8 text-center text-3xl font-bold text-gray-900">Admin Login</h1>

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
			class="space-y-6"
		>
			<div>
				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					class="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-holdeman focus:outline-none focus:ring-2 focus:ring-holdeman sm:text-sm"
				/>
			</div>

			{#if error}
				<div class="rounded-md bg-red-50 p-4">
					<p class="text-sm text-red-700">{error}</p>
				</div>
			{/if}

			<button
				type="submit"
				class="group relative flex w-full justify-center rounded-lg border border-transparent bg-holdeman px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-holdeman/90 focus:outline-none focus:ring-2 focus:ring-holdeman focus:ring-offset-2"
			>
				Login
			</button>
		</form>
	</div>
</div>
