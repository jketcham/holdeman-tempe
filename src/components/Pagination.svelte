<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;
	export let onPageChange: (page: number) => void;

	$: pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	$: visiblePages = getVisiblePages(currentPage, totalPages);

	function getVisiblePages(current: number, total: number) {
		const delta = 2;
		const left = current - delta;
		const right = current + delta + 1;
		const rangeWithDots: Array<number | string> = [];
		let l: number;

		for (let i = 1; i <= total; i++) {
			if (i === 1 || i === total || (i >= left && i < right)) {
				rangeWithDots.push(i);
			} else if (i < left && rangeWithDots[rangeWithDots.length - 1] !== '...') {
				rangeWithDots.push('...');
			} else if (i >= right && rangeWithDots[rangeWithDots.length - 1] !== '...') {
				rangeWithDots.push('...');
			}
		}

		return rangeWithDots;
	}
</script>

{#if totalPages > 1}
	<div class="flex items-center justify-center space-x-2">
		<button
			class="rounded px-3 py-1 text-sm {currentPage === 1
				? 'cursor-not-allowed text-gray-400'
				: 'text-holdeman hover:bg-gray-100'}"
			on:click={() => currentPage > 1 && onPageChange(currentPage - 1)}
			disabled={currentPage === 1}
		>
			Previous
		</button>

		{#each visiblePages as page}
			{#if typeof page === 'number'}
				<button
					class="rounded px-3 py-1 text-sm {currentPage === page
						? 'bg-holdeman text-white'
						: 'text-holdeman hover:bg-gray-100'}"
					on:click={() => onPageChange(page)}
				>
					{page}
				</button>
			{:else}
				<span class="px-2 text-gray-400">...</span>
			{/if}
		{/each}

		<button
			class="rounded px-3 py-1 text-sm {currentPage === totalPages
				? 'cursor-not-allowed text-gray-400'
				: 'text-holdeman hover:bg-gray-100'}"
			on:click={() => currentPage < totalPages && onPageChange(currentPage + 1)}
			disabled={currentPage === totalPages}
		>
			Next
		</button>
	</div>
{/if}
