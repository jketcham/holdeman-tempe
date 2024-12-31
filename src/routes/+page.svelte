<script lang="ts">
	import Container from '../components/Container.svelte';
	import Banner from '../components/Banner.svelte';

	export let data;
	const { bannerData } = data;
</script>

<svelte:head>
	<title>Holdeman Neighborhood Association</title>
	<meta name="description" content="Home page for the Holdeman Neighborhood Association" />
</svelte:head>

<main class="min-h-screen py-8">
	<Container>
		{#if bannerData}
			<Banner
				title={bannerData.title}
				description={bannerData.description}
				link_url={bannerData.link_url}
				link_text={bannerData.link_text}
				updatedAt={bannerData.created_at}
			/>
		{/if}

		<div class="space-y-4">
			<a
				href="/survey"
				class="block w-full bg-white hover:bg-neutral-50 transition rounded-lg p-6 text-center font-display uppercase font-bold text-xl border border-neutral-300"
			>
				Project Ideas Survey
			</a>
			<a
				href="https://holdemantempe.org/newsletter"
				class="block w-full bg-white hover:bg-neutral-50 transition rounded-lg p-6 text-center font-display uppercase font-bold text-xl border border-neutral-300"
			>
				Newsletter Signup
			</a>
		</div>
	</Container>
</main>
