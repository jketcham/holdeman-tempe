<script lang="ts">
  import "../app.css";
  import Navbar from "../components/Navbar.svelte";
  import Container from "../components/Container.svelte";
  import Footer from "../components/Footer.svelte";

  export let data;
</script>

<div class="flex min-h-screen flex-col">
  <Navbar initialWeather={data.weather} />

  <main class="flex-grow">
    <slot />
  </main>

  <Footer />
</div>

<style>
  :global(html) {
    height: 100%;
  }

  :global(body) {
    height: 100%;
  }
</style>
