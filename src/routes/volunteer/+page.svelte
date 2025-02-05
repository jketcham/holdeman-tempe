<script lang="ts">
  import Container from "../../components/Container.svelte";
  import SEO from "../../components/SEO.svelte";
  import type { PageMetadata } from "$lib/types/metadata";

  const pageMetadata: PageMetadata = {
    title: "Volunteer: Hardy Bike Lane Project",
    description:
      "Join us in painting the Hardy Drive bike lane murals! Sign up for volunteer shifts to help create beautiful and safe streets in our neighborhood.",
    type: "article",
    publishedAt: "2024-02-01T00:00:00Z",
    modifiedAt: "2024-02-01T00:00:00Z",
  };
</script>

<SEO metadata={pageMetadata} />

<Container class="mb-10 mt-4">
  <div class="flex flex-col py-8 text-center">
    <h1 class="mb-2 font-display text-3xl font-bold uppercase">Hardy Drive Bike Lane Project</h1>
    <h2 class="text-lg">Volunteer Sign-up</h2>
  </div>

  <hr />

  <div class="my-8 space-y-4">
    <p>
      We're excited to begin installing our community-designed bike lane murals on Hardy Drive! This
      project will create a more vibrant and safer street for everyone. We need volunteers to help
      with painting during February and early March.
    </p>

    <p>
      The installation will happen in two phases, with work on the east side followed by the west
      side of Hardy Drive. Artist <a
        href="https://www.nnuzzo.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 underline hover:text-blue-800">Nicole Poppell</a
      > will be coordinating volunteers throughout the installation.
    </p>
  </div>

  <div class="my-8 rounded-lg border border-neutral-200">
    <picture>
      <img
        src="/images/Hardy-Art-Guide.png"
        alt="Hardy Drive bike lane mural design guide"
        class="w-full rounded-lg"
        loading="lazy"
      />
    </picture>
  </div>

  <div class="my-8 rounded-lg bg-holdeman/10 p-6">
    <h2 class="mb-4 text-xl font-bold">Project Timeline</h2>
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="font-bold">East Side Installation</h3>
        <ul class="list-disc space-y-2 pl-4">
          <li>February 19: Barricades set up</li>
          <li>February 20-23: Painting</li>
        </ul>
      </div>

      <div class="space-y-2">
        <h3 class="font-bold">West Side Installation</h3>
        <ul class="list-disc space-y-2 pl-4">
          <li>February 25: Barricades moved to west side</li>
          <li>February 26 - March 3: Painting</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="my-8 space-y-4">
    <h2 class="text-2xl">Volunteer Information</h2>

    <div class="space-y-2">
      <p class="font-bold">Important Notes:</p>
      <ul class="list-disc space-y-2 pl-4">
        <li>This event is for ages 18 and older due to street safety considerations</li>
        <li>All volunteers must sign a waiver (provided at the event)</li>
        <li>No prior painting experience required - all materials will be provided</li>
        <li>Time slots are approximately 2 hours</li>
        <li>
          The closest restrooms are at Clark Park Community Center, about a 5-6 minute walk away
        </li>
      </ul>
    </div>

    <div class="space-y-2">
      <p class="font-bold">What to Bring:</p>
      <ul class="list-disc space-y-2 pl-4">
        <li>Sunblock</li>
        <li>Water bottle (plan to drink water at least every 30 minutes)</li>
        <li>Large-brim hat (there will be minimal shade)</li>
        <li>
          Clothes and closed-toe shoes you don't mind getting paint on (paint will not wash out)
        </li>
      </ul>
    </div>
  </div>

  <div class="my-8 rounded-lg bg-holdeman/10 p-6 text-center">
    <h2 class="mb-4 text-xl font-bold">Ready to Help?</h2>
    <p class="mb-6">
      Sign up for a volunteer shift! Please select only one time slot initially to ensure everyone
      has a chance to participate.
    </p>
    <a
      href="https://volunteersignup.org/P9RXQ"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block rounded bg-holdeman-400 px-6 py-4 font-bold transition hover:bg-holdeman-500"
    >
      Sign Up to Volunteer
    </a>
  </div>

  <div class="my-8 space-y-8">
    <div class="grid gap-4 md:grid-cols-2">
      <picture>
        <source srcset="/images/image1.webp" type="image/webp" />
        <img
          src="/images/image1.jpg"
          alt="Hardy Drive bike lane mural design - first section"
          class="w-full rounded-lg"
          loading="lazy"
        />
      </picture>
      <picture>
        <source srcset="/images/image3.webp" type="image/webp" />
        <img
          src="/images/image3.jpg"
          alt="Hardy Drive bike lane mural design - second section"
          class="w-full rounded-lg"
          loading="lazy"
        />
      </picture>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-2xl">Questions?</h2>
    <p class="mt-4">
      If you have any questions about volunteering, please email Jack Ketcham, the association chair,
      at <a href="mailto:jack@holdemantempe.org" class="text-blue-600 underline hover:text-blue-800"
        >jack@holdemantempe.org</a
      >.
    </p>
  </div>
</Container>

<style>
  a {
    cursor: pointer;
  }
</style>
