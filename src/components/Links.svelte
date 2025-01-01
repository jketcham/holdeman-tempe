<script lang="ts">
	import type { Link } from '$lib/types';
	export let links: Link[] = [];

	function handleClick(link: Link) {
		// Fire and forget - don't await
		fetch('/api/link-event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				link_id: link.id
			})
		}).catch((error) => {
			console.error('Failed to track link click:', error);
		});
	}
</script>

<div class="space-y-4">
	{#each links as link}
		<a
			href={link.link_url}
			class="block w-full bg-white hover:bg-neutral-50 transition rounded-lg p-6 text-center font-display uppercase font-bold text-xl border border-neutral-200"
			{...!link.link_url.startsWith('/') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
			on:click={() => handleClick(link)}
		>
			{link.link_label}
		</a>
	{/each}
</div>
