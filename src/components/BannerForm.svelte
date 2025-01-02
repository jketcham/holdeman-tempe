<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import type { BannerUpdate } from '$lib/types';

	export let banner: Partial<BannerUpdate> = {};
	export let action = '?/createBanner';
	export let onSuccess: () => void;

	$: isEdit = !!banner.id;
</script>

<form
	method="POST"
	{action}
	use:enhance={({ formElement }) => {
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidate('app:banners');
				formElement.reset();
				onSuccess();
			}
		};
	}}
	class="mb-6 space-y-4"
>
	{#if isEdit}
		<input type="hidden" name="id" value={banner.id} />
	{/if}

	<div>
		<label class="mb-1 block text-sm font-medium" for="title">Title</label>
		<input
			type="text"
			id="title"
			name="title"
			value={banner.title ?? ''}
			required
			class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
		/>
	</div>
	<div>
		<label class="mb-1 block text-sm font-medium" for="content">Content (Markdown)</label>
		<textarea
			id="content"
			name="content"
			required
			rows="4"
			class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
			>{banner.content ?? ''}</textarea
		>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div>
			<label class="mb-1 block text-sm font-medium" for="link_url">Link URL</label>
			<input
				type="text"
				id="link_url"
				name="link_url"
				value={banner.link_url ?? ''}
				class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
			/>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium" for="link_label">Link Label</label>
			<input
				type="text"
				id="link_label"
				name="link_label"
				value={banner.link_label ?? ''}
				class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
			/>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div>
			<label class="mb-1 block text-sm font-medium" for="start_date">Start Date</label>
			<input
				type="datetime-local"
				id="start_date"
				name="start_date"
				value={banner.start_date?.slice(0, 16) ?? ''}
				class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
			/>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium" for="end_date">End Date</label>
			<input
				type="datetime-local"
				id="end_date"
				name="end_date"
				value={banner.end_date?.slice(0, 16) ?? ''}
				class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
			/>
		</div>
	</div>
	<div class="flex justify-end space-x-2">
		<button type="button" class="text-gray-600" on:click={onSuccess}>Cancel</button>
		<button type="submit" class="rounded bg-holdeman px-4 py-2 text-white">
			{isEdit ? 'Save Changes' : 'Create Banner'}
		</button>
	</div>
</form>
