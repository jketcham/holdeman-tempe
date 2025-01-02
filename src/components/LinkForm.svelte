<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import type { Link } from '$lib/types';

	export let link: Partial<Link> = {};
	export let action = '?/createLink';
	export let onSuccess: () => void;

	$: isEdit = !!link.id;
</script>

<form
	method="POST"
	{action}
	use:enhance={({ formElement }) => {
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidate('app:links');
				formElement.reset();
				onSuccess();
			}
		};
	}}
	class="mb-6 space-y-4"
>
	{#if isEdit}
		<input type="hidden" name="id" value={link.id} />
	{/if}

	<div>
		<label class="mb-1 block text-sm font-medium" for="link_label">Label</label>
		<input
			type="text"
			id="link_label"
			name="link_label"
			value={link.link_label ?? ''}
			required
			class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
		/>
	</div>
	<div>
		<label class="mb-1 block text-sm font-medium" for="link_url">URL</label>
		<input
			type="text"
			id="link_url"
			name="link_url"
			value={link.link_url ?? ''}
			required
			class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
		/>
	</div>
	<div>
		<label class="mb-1 block text-sm font-medium" for="order">Order</label>
		<input
			type="number"
			id="order"
			name="order"
			value={link.order ?? ''}
			required
			class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
		/>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div>
			<label class="mb-1 block text-sm font-medium" for="start_date">Start Date</label>
			<input
				type="datetime-local"
				id="start_date"
				name="start_date"
				value={link.start_date?.slice(0, 16) ?? ''}
				class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
			/>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium" for="end_date">End Date</label>
			<input
				type="datetime-local"
				id="end_date"
				name="end_date"
				value={link.end_date?.slice(0, 16) ?? ''}
				class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
			/>
		</div>
	</div>
	<div class="flex justify-end space-x-2">
		<button type="button" class="text-gray-600" on:click={onSuccess}>Cancel</button>
		<button type="submit" class="rounded bg-holdeman px-4 py-2 text-white">
			{isEdit ? 'Save Changes' : 'Create Link'}
		</button>
	</div>
</form>
