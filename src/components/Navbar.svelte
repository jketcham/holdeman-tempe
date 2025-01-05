<script lang="ts">
  import Weather from "./Weather.svelte";
  import NextEvent from "./NextEvent.svelte";
  import Container from "./Container.svelte";
  import type { Event } from "$lib/types";

  export let initialWeather: { temperature: number; conditions: string } | null = null;
  export let nextEvent: Event | null = null;
</script>

<div class="flex flex-col">
  <div class="bg-holdeman">
    <Container>
      <Weather {initialWeather} />
      <a href="/">
        <div class="flex flex-col justify-between py-5 font-display uppercase sm:py-5 md:py-8">
          <span class="mb-1 block text-3xl font-bold leading-7 sm:leading-9 md:mb-2 md:text-5xl"
            >Holdeman</span
          >
          <div class="flex justify-between">
            <div class="flex flex-shrink flex-col">
              <span class="block text-lg font-bold leading-5 sm:leading-7 md:text-2xl"
                >Neighborhood</span
              >
              <span class="block text-lg font-bold leading-5 sm:leading-7 md:text-2xl"
                >Association</span
              >
            </div>
            <div class="flex flex-shrink-0 flex-col justify-between text-right">
              <span class="block text-lg font-bold leading-5 sm:mt-auto md:text-2xl">Est. 1998</span>
              <span class="block text-xs md:text-xl">holdemantempe.org</span>
            </div>
          </div>
        </div>
      </a>
      <NextEvent {nextEvent} />
    </Container>
  </div>
</div>
