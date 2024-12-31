<script lang="ts">
	import { marked } from 'marked';
	export let title = '';
	export let description = '';
	export let link_url = '';
	export let link_text = '';
	export let updatedAt = '';

	$: formattedDescription = marked(description);

	function formatDate(isoString: string): string {
		if (!isoString) return '';
		const date = new Date(isoString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<div class="bg-holdeman/10 rounded-lg p-6 mb-8">
	<div class="font-display uppercase font-bold text-xl mb-2">{title}</div>
	<div class="text-neutral-700 prose prose-sm max-w-none whitespace-pre-line">
		{@html formattedDescription}
	</div>

	{#if link_url && link_text}
		<div>
			<a href={link_url}>
				<button
					class="bg-holdeman-400 px-6 py-3 rounded font-bold hover:bg-holdeman-500 transition"
				>
					{link_text}
				</button>
			</a>
		</div>
	{/if}

	{#if updatedAt}
		<div class="mt-4 text-sm text-neutral-500 italic">
			Updated {formatDate(updatedAt)}
		</div>
	{/if}
</div>
