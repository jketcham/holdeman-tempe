<script lang="ts">
  import Weather from "./Weather.svelte";
  import Container from "./Container.svelte";

  export let initialWeather: { temperature: number; conditions: string } | null = null;
</script>

<div class="flex flex-col">
  <div class="bg-holdeman">
    <Container>
      <Weather {initialWeather} />
      <a href="/">
        <div class="flex justify-between py-5 font-display uppercase md:py-8">
          <div class="flex flex-shrink flex-col">
            <span class="block text-2xl font-bold md:mb-2 md:text-5xl">Holdeman</span>
            <span class="block text-lg font-bold md:text-2xl">Neighborhood</span>
            <span class="block text-lg font-bold md:text-2xl">Association</span>
          </div>
          <div class="flex flex-shrink-0 flex-col text-right">
            <span class="mt-auto block text-lg font-bold md:mb-2 md:text-2xl">Est. 1998</span>
            <span class="block text-xs md:text-xl">holdemantempe.org</span>
          </div>
        </div>
      </a>
    </Container>
  </div>
</div>
