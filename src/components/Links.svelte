<script lang="ts">
	import type { Link } from '$lib/types';
	export let links: Link[] = [];
</script>

<div class="space-y-4">
	{#each links as { link_url, link_label }}
		<a
			href={link_url}
			class="block w-full bg-white hover:bg-neutral-50 transition rounded-lg p-6 text-center font-display uppercase font-bold text-xl border border-neutral-200"
			{...!link_url.startsWith('/') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
		>
			{link_label}
		</a>
	{/each}
</div>
