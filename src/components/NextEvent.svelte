<script lang="ts">
  import { formatDate } from "$lib/utils/dates";
  import type { Event } from "$lib/types";

  export let nextEvent: Event | null = null;

  $: formattedDate = nextEvent
    ? (() => {
        const eventDate = new Date(nextEvent.start_date);
        const currentYear = new Date().getFullYear();

        return formatDate(nextEvent.start_date, {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          ...(eventDate.getFullYear() !== currentYear ? { year: "numeric" } : {}),
        });
      })()
    : null;
</script>

{#if nextEvent}
  <div class="flex flex-col border-t border-black py-1.5">
    <div class="flex flex-col md:flex-row md:items-center">
      <span class="font-bold md:inline">Next event:</span>
      <span class="md:ml-1">{nextEvent.name}</span>
      {#if nextEvent.location}
        <span class="md:ml-1">
          <span class="md:hidden">📍</span>
          <span class="hidden md:inline">@</span>
          {nextEvent.location}
        </span>
      {/if}
      <span class="md:ml-1">
        <span class="md:hidden">🗓️</span>
        <span class="hidden md:inline">on</span>
        {formattedDate}
      </span>
    </div>
  </div>
{/if}
