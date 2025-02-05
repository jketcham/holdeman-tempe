<script lang="ts">
  import Container from "../../components/Container.svelte";
  import SEO from "../../components/SEO.svelte";
  import type { PageMetadata } from "$lib/types/metadata";

  const pageMetadata: PageMetadata = {
    title: "Project Selection",
    description:
      "Help choose our next neighborhood grant project! Vote on the top project ideas for improving our community.",
    type: "article",
    publishedAt: "2024-01-02T00:00:00Z",
    modifiedAt: "2024-02-01T00:00:00Z",
  };
</script>

<SEO metadata={pageMetadata} />

<Container class="mb-10 mt-4">
  <div class="flex flex-col py-8 text-center">
    <h1 class="mb-2 font-display text-3xl font-bold uppercase">Project Selection</h1>
    <h2 class="text-lg">2025–2026 Neighborhood Grant</h2>
    <h2 class="text-lg text-neutral-500">Vote on Our Next Project</h2>
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
    <span>Selection Process Update</span>
  </h1>
  <p class="py-0">
    <span>We've completed the first phase of our project selection process:</span>
  </p>

  <div class="my-4 space-y-4">
    <div class="rounded bg-holdeman/10 p-4">
      <h3 class="font-bold">Phase 1: Completed ✓</h3>
      <p>
        In January, we collected project ideas through our initial survey and held a neighborhood
        meeting to discuss possibilities. Three main themes emerged as priorities:
      </p>
      <ul class="ml-6 mt-2 list-disc space-y-1">
        <li>Tree planting and water harvesting initiatives</li>
        <li>
          Traffic calming measures, particularly around Holdeman Elementary and along 16th St / Polly
          Ann
        </li>
        <li>Public art installations</li>
      </ul>
    </div>

    <div class="rounded bg-holdeman/10 p-4">
      <h3 class="font-bold">Phase 2: Vote on Top Ideas</h3>
      <p>
        Now through February 21: Help us prioritize these project themes by ranking your preferences
        in our follow-up survey.
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
    <h2 class="mb-4 text-xl font-bold">Cast Your Vote!</h2>
    <p class="mb-4">
      Help us choose the best project for our neighborhood by ranking your preferences among the top
      themes.
    </p>
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSeyBJPkVbw3PAMY6u6J6qGmVAmgBduxwsTrfq7UU6E5YVDihA/viewform?usp=dialog"
      target="_blank"
      rel="noopener"
    >
      <button class="rounded bg-holdeman-400 px-6 py-4 font-bold transition hover:bg-holdeman-500">
        Take the Survey
      </button>
    </a>
  </div>

  <h1 class="pb-1.5 pt-5 text-left text-2xl">
    <span>Project Examples</span>
  </h1>
  <p class="py-0 italic">Here's what these types of projects could look like:</p>
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
        <span class="font-bold">Tree Planting & Water Harvesting</span>
        <p class="mt-2">
          Adding shade trees and water harvesting features to help cool our neighborhood and manage
          stormwater.
        </p>
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
        <span class="font-bold">Traffic Calming</span>
        <p class="mt-2">
          Safety improvements near Holdeman Elementary and along 16th St / Polly Ann to help slow
          traffic and protect pedestrians.
        </p>
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
        <span class="font-bold">Public Art</span>
        <p class="mt-2">
          Creative installations to beautify our neighborhood and create a stronger sense of place.
        </p>
      </div>
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
