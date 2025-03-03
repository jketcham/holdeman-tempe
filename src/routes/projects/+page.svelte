<script lang="ts">
  import Container from "../../components/Container.svelte";
  import SEO from "../../components/SEO.svelte";
  import Image from "../../components/Image.svelte";
  import type { PageMetadata } from "$lib/types/metadata";
  import { getAllProjects } from "$lib/projects";
  import type { Project } from "$lib/types";

  const projects = getAllProjects();

  const pageMetadata: PageMetadata = {
    title: "Neighborhood Projects",
    description:
      "Explore the past and current neighborhood improvement projects of the Holdeman Neighborhood Association.",
    type: "article",
    publishedAt: "2024-03-03T00:00:00Z",
    modifiedAt: "2024-03-03T00:00:00Z",
  };
</script>

<SEO metadata={pageMetadata} />

<Container class="mb-10 mt-4">
  <div class="flex flex-col py-8 text-center">
    <h1 class="mb-2 font-display text-3xl font-bold uppercase">Neighborhood Projects</h1>
    <h2 class="text-lg">Past and Current Initiatives</h2>
  </div>

  <hr />

  <div class="my-8 space-y-4">
    <p>
      The Holdeman Neighborhood Association works on various community improvement projects to
      enhance our neighborhood's quality of life, safety, and beauty. These projects are often funded
      through the <a
        href="https://www.tempe.gov/government/city-manager-s-office/neighborhood-services/neighborhood-grant-program"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 underline hover:text-blue-800"
        >City of Tempe Neighborhood Grant Program</a
      > and brought to life through community participation.
    </p>
  </div>

  <div class="my-8 grid gap-8 md:grid-cols-2">
    {#each projects as project}
      <div class="group">
        <a href="/projects/{project.slug}" class="block">
          <div
            class="overflow-hidden rounded-lg border transition group-hover:shadow-md {project.current
              ? 'border-holdeman-400 bg-holdeman/5'
              : 'border-neutral-200'}"
          >
            {#if project.current}
              <div class="bg-holdeman-400 px-4 py-1 text-center text-sm font-bold text-white">
                Current Project
              </div>
            {/if}
            <div class="aspect-video overflow-hidden">
              <Image
                image={project.image}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="p-6">
              <h3 class="mb-2 font-display text-xl font-bold">{project.title}</h3>
              <p class="mb-2 text-sm text-neutral-600">{project.year}</p>
              <p>{project.description}</p>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>

  <div class="mt-8">
    <h2 class="text-2xl">Get Involved</h2>
    <p class="mt-4">
      Interested in contributing to our neighborhood projects? Join us at our next meeting or contact
      us at
      <a href="mailto:info@holdemantempe.org" class="text-blue-600 underline hover:text-blue-800">
        info@holdemantempe.org
      </a>.
    </p>
  </div>
</Container>
