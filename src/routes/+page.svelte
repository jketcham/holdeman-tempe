<script lang="ts">
  import Container from "../components/Container.svelte";
  import Banner from "../components/Banner.svelte";
  import Links from "../components/Links.svelte";
  import Image from "../components/Image.svelte";
  import SEO from "../components/SEO.svelte";
  import type { PageMetadata } from "$lib/types/metadata";
  import type { Project } from "$lib/types";

  export let data;
  const { bannerData, links, currentProject } = data;

  const pageMetadata: PageMetadata = {
    title: "Home",
    description:
      "The official website of the Holdeman Neighborhood Association in Tempe, Arizona. Stay connected with your community and learn about upcoming events and initiatives.",
    type: "website",
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

    {#if currentProject}
      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-bold">Current Project</h2>
        <div class="group">
          <a href="/projects/{currentProject.slug}" class="block">
            <div
              class="overflow-hidden rounded-lg border border-holdeman-400 bg-holdeman/5 transition group-hover:shadow-md"
            >
              <div class="bg-holdeman-400 px-4 py-1 text-center text-sm font-bold text-white">
                Current Project
              </div>
              <div class="aspect-video overflow-hidden">
                <Image
                  image={currentProject.image}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="p-6">
                <h3 class="mb-2 font-display text-xl font-bold">{currentProject.title}</h3>
                <p class="mb-2 text-sm text-neutral-600">{currentProject.year}</p>
                <p>{currentProject.description}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    {/if}

    <Links {links} />
  </Container>
</main>
