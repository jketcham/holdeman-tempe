<script lang="ts">
  import type { Image as ImageType } from "$lib/types";

  export let image: ImageType;
  export let className = "";
  export let loading: "eager" | "lazy" = "lazy";

  // Sort formats to prioritize WebP first, then other formats
  const sortedFormats = [...image.formats].sort((a, b) => {
    if (a === "webp") return -1;
    if (b === "webp") return 1;
    return 0;
  });

  // Get the fallback format (first non-WebP format, or the last format if all are WebP)
  const fallbackFormat =
    sortedFormats.find((format) => format !== "webp") || sortedFormats[sortedFormats.length - 1];
</script>

<picture>
  {#each sortedFormats.filter((format) => format !== fallbackFormat) as format}
    <source srcset="{image.path}.{format}" type="image/{format}" />
  {/each}
  <img src="{image.path}.{fallbackFormat}" alt={image.alt} class={className} {loading} />
</picture>
