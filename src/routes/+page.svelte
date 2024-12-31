<script lang="ts">
	import Container from '../components/Container.svelte';
	import Banner from '../components/Banner.svelte';
	import Links from '../components/Links.svelte';

	export let data;
	const { bannerData, links } = data;
</script>

<svelte:head>
	<title>Holdeman Neighborhood Association</title>
	<meta name="description" content="Home page for the Holdeman Neighborhood Association" />
</svelte:head>

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
