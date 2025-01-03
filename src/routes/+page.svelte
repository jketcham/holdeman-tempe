<script lang="ts">
	import Container from '../components/Container.svelte';
	import Banner from '../components/Banner.svelte';
	import Links from '../components/Links.svelte';
	import SEO from '../components/SEO.svelte';
	import type { PageMetadata } from '$lib/types/metadata';

	export let data;
	const { bannerData, links } = data;

	const pageMetadata: PageMetadata = {
		title: 'Home',
		description:
			'The official website of the Holdeman Neighborhood Association in Tempe, Arizona. Stay connected with your community and learn about upcoming events and initiatives.',
		type: 'website'
	};
</script>

<SEO metadata={pageMetadata} />

<main class="py-8">
	<Container>
		{#if bannerData}
			<Banner
				title={bannerData.title}
				description={bannerData.content}
				link_url={bannerData.link_url}
				link_text={bannerData.link_label}
				updatedAt={bannerData.updated_at}
			/>
		{/if}

		<Links {links} />
	</Container>
</main>
