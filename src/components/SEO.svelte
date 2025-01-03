<script lang="ts">
	import { page } from '$app/stores';
	import { siteMetadata } from '$lib/config/metadata';
	import type { PageMetadata } from '$lib/types/metadata';

	export let metadata: PageMetadata;

	const fullTitle = `${metadata.title} – ${siteMetadata.siteName}`;

	// Construct the canonical URL, removing trailing slashes except for root
	const canonicalUrl =
		metadata.canonicalUrl ||
		(() => {
			const pathname = $page.url.pathname;
			// For root path ('/'), keep as is
			if (pathname === '/') {
				return siteMetadata.siteUrl;
			}
			// For all other paths, remove trailing slash
			return `${siteMetadata.siteUrl}${pathname.replace(/\/$/, '')}`;
		})();

	// Construct JSON-LD data
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': metadata.type || 'WebPage',
		name: metadata.title,
		description: metadata.description,
		url: canonicalUrl,
		...(metadata.publishedAt && {
			datePublished: metadata.publishedAt,
			dateModified: metadata.modifiedAt || metadata.publishedAt
		}),
		...(metadata.authors && {
			author: metadata.authors.map((author) => ({
				'@type': 'Person',
				name: author.name,
				url: author.url
			}))
		}),
		publisher: {
			'@type': 'Organization',
			name: siteMetadata.organization.name,
			logo: {
				'@type': 'ImageObject',
				url: `${siteMetadata.siteUrl}${siteMetadata.organization.logo}`
			}
		}
	};
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={metadata.description} />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:type" content={metadata.type || 'website'} />
	<meta property="og:image" content={metadata.image || siteMetadata.defaultImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	{#if siteMetadata.twitterHandle}
		<meta name="twitter:site" content={siteMetadata.twitterHandle} />
	{/if}
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={metadata.description} />
	<meta name="twitter:image" content={metadata.image || siteMetadata.defaultImage} />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
