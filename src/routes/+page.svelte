<script>
	import Container from '../components/Container.svelte';
	import Banner from '../components/Banner.svelte';
</script>

<svelte:head>
	<title>Holdeman Neighborhood Association</title>
	<meta name="description" content="Home page for the Holdeman Neighborhood Association" />
</svelte:head>

<main class="min-h-screen py-8">
	<Container>
		<Banner
			title="Help Choose Our Next Project!"
			description={`Share your ideas for our **2025–2026 Neighborhood Grant Project**.

Survey open through **January 24th**.`}
			link_url="/survey"
			link_text="Take the Survey"
			updatedAt="2024-01-02"
		/>

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
