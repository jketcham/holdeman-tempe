<script lang="ts">
  import Container from "../../components/Container.svelte";
  import SEO from "../../components/SEO.svelte";
  import type { PageMetadata } from "$lib/types/metadata";

  const pageMetadata: PageMetadata = {
    title: "Project Ideas",
    description:
      "Help choose our next neighborhood grant project! Share your ideas and preferences for improving our community.",
    type: "article",
    publishedAt: "2024-01-02T00:00:00Z",
    modifiedAt: "2024-01-02T00:00:00Z",
  };
</script>

<SEO metadata={pageMetadata} />

<Container class="mb-10 mt-4">
  <div class="flex flex-col pb-4 text-center">
    <h1 class="mb-2 font-display text-3xl font-bold uppercase">Project Ideas</h1>
    <h2 class="text-lg">2025–2026 Neighborhood Grant</h2>
    <h2 class="text-lg text-neutral-500">Share Your Vision for Holdeman</h2>
  </div>

  <hr />

  <h1 class="pb-1.5 pt-5 text-left text-2xl">
    <span>Background</span>
  </h1>
  <p class="py-0">
    <span>We're preparing to apply for another </span><span class="text-blue-600 underline"
      ><a
        class="text-inherit no-underline"
        target="_blank"
        rel="noreferer nofollow"
        href="https://www.tempe.gov/government/city-manager-s-office/neighborhood-services/neighborhood-grant-program"
        >Maryanne Corder Neighborhood Grant</a
      ></span
    ><span>, and we want your input on what our next project should be!</span>
  </p>

  <h1 class="pb-1.5 pt-5 text-left text-2xl">
    <span>Selection Process</span>
  </h1>
  <p class="py-0">
    <span>We're using a two-phase process to select our next project:</span>
  </p>

  <div class="my-4 space-y-4">
    <div class="rounded bg-holdeman/10 p-4">
      <h3 class="font-bold">Phase 1: Share Your Ideas</h3>
      <p>
        January 2–24: Submit your preferred project type and up to three ideas for neighborhood
        improvements through our survey.
      </p>
    </div>

    <div class="rounded bg-holdeman/10 p-4">
      <h3 class="font-bold">Phase 2: Vote on Top Ideas</h3>
      <p>
        January 31–February 21: After reviewing all submissions, we'll create a follow-up survey
        where you can rank your favorite ideas.
      </p>
    </div>
  </div>

  <h1 class="pb-1.5 pt-5 text-left text-2xl">
    <span>Project Requirements</span>
  </h1>
  <p class="py-0">All grant projects must:</p>
  <ul class="my-4 ml-8 list-disc space-y-2">
    <li>Be completed within one year of being funded (by June 2026)</li>
    <li>Fit within a $20,000 budget (the grant's maximum award)</li>
  </ul>
  <p class="py-0">
    Keep in mind that bigger projects can be split into multi-year phases, with each phase funded by
    separate grant cycles. We can also partner with neighboring associations to pool grant
    funding—for example, teaming up with another neighborhood would allow for a $40,000 project
    budget, etc.
  </p>

  <div class="my-8 rounded-lg bg-holdeman/10 p-6 text-center">
    <h2 class="mb-4 text-xl font-bold">Share Your Ideas!</h2>
    <p class="mb-4">
      Help shape the future of our neighborhood by submitting your project ideas and preferences.
    </p>
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfVdPhDiWfgdf9xkrGpSEK_6T4CLOVgnH4AHgV3ucFOLF-QMg/viewform?usp=dialog"
      target="_blank"
      rel="noopener"
    >
      <button class="rounded bg-holdeman-400 px-6 py-4 font-bold transition hover:bg-holdeman-500">
        Take the Survey
      </button>
    </a>
  </div>

  <h1 class="pb-1.5 pt-5 text-left text-2xl">
    <span>Example Project Ideas</span>
  </h1>
  <p class="py-0 italic">Here are a few possibilities to inspire you:</p>
  <div class="my-6 space-y-8">
    <div class="grid items-start gap-4 md:grid-cols-2">
      <picture>
        <source srcset="images/tree-planting.webp" type="image/webp" />
        <img
          alt="Trees providing shade along a neighborhood street"
          loading="lazy"
          src="images/tree-planting.jpg"
          class="h-48 w-full rounded-lg object-cover"
        />
      </picture>
      <div class="md:pt-2">
        <span>Neighborhood tree planting to add shade and increase cooling.</span>
      </div>
    </div>

    <div class="grid items-start gap-4 md:grid-cols-2">
      <picture>
        <source srcset="images/bioswale.webp" type="image/webp" />
        <img
          alt="Native plants in a stormwater basin"
          loading="lazy"
          src="images/bioswale.jpg"
          class="h-48 w-full rounded-lg object-cover"
        />
      </picture>
      <div class="md:pt-2">
        <span>Stormwater harvesting and native species planting along streets.</span>
      </div>
    </div>

    <div class="grid items-start gap-4 md:grid-cols-2">
      <picture>
        <source srcset="images/traffic-circle.webp" type="image/webp" />
        <img
          alt="Traffic circle with plants"
          loading="lazy"
          src="images/traffic-circle.jpg"
          class="h-48 w-full rounded-lg object-cover"
        />
      </picture>
      <div class="md:pt-2">
        <span>Traffic calming measures (traffic circles/speed bumps) to enhance safety.</span>
      </div>
    </div>

    <div class="grid items-start gap-4 md:grid-cols-2">
      <picture>
        <source srcset="images/public-art.webp" type="image/webp" />
        <img
          alt="Public art installation in a median"
          loading="lazy"
          src="images/public-art.jpg"
          class="h-48 w-full rounded-lg object-cover"
        />
      </picture>
      <div class="md:pt-2">
        <span
          >Public art installations in shared spaces, like the medians on Hardy or on street corners.</span
        >
      </div>
    </div>

    <div class="grid items-start gap-4 md:grid-cols-2">
      <picture>
        <source srcset="images/wall-mural.webp" type="image/webp" />
        <img
          alt="Colorful mural on a residential wall"
          loading="lazy"
          src="images/wall-mural.jpg"
          class="h-48 w-full rounded-lg object-cover"
        />
      </picture>
      <div class="md:pt-2">
        <span>Mural painting on neighbors' street-facing walls to add color and charm.</span>
      </div>
    </div>
  </div>

  <div class="mb-10 mt-8">
    <h2 class="text-2xl">Stay Updated</h2>

    <p class="my-4">
      Sign up for our email newsletter to receive updates about the project selection process and
      other neighborhood news.
    </p>
    <div class="flex justify-center">
      <a class="text-inherit no-underline" href="https://holdemantempe.org/newsletter">
        <button class="rounded bg-holdeman-400 px-6 py-4 font-bold transition hover:bg-holdeman-500">
          Newsletter signup
        </button>
      </a>
    </div>
  </div>
</Container>

<style>
  img {
    max-inline-size: 100%;
    block-size: auto;
  }

  button {
    cursor: pointer;
  }

  a {
    cursor: pointer;
  }
</style>
