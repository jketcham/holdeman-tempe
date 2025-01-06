<script lang="ts">
  import { marked } from "marked";
  import type { BannerUpdate } from "$lib/types";

  export let title: string;
  export let description: string;
  export let link_url: BannerUpdate["link_url"] = null;
  export let link_text: BannerUpdate["link_label"] = null;
  export let updatedAt: string;

  $: formattedDescription = marked(description);

  function formatDate(isoString: string): string {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
</script>

<div class="mb-8 rounded-lg bg-holdeman/10 p-6">
  <div class="mb-2 font-display text-xl font-bold uppercase">{title}</div>
  <div class="prose prose-sm max-w-none whitespace-pre-line text-neutral-700">
    {@html formattedDescription}
  </div>

  {#if link_url && link_text}
    <div>
      <a href={link_url}>
        <button class="rounded bg-holdeman-400 px-6 py-3 font-bold transition hover:bg-holdeman-500">
          {link_text}
        </button>
      </a>
    </div>
  {/if}

  {#if updatedAt}
    <div class="mt-4 text-sm italic text-neutral-600">
      Updated {formatDate(updatedAt)}
    </div>
  {/if}
</div>
