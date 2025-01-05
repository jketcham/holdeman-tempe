<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  import type { Event } from "$lib/types";
  import { fromSQLiteDateTime } from "$lib/utils/dates";

  export let event: Partial<Event> = {};
  export let action = "?/createEvent";
  export let onSuccess: () => void;

  $: isEdit = !!event.id;

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function updateSlug(e: { currentTarget: HTMLInputElement }) {
    if (!isEdit) {
      const slugInput = document.getElementById("slug") as HTMLInputElement;
      if (slugInput) {
        slugInput.value = generateSlug(e.currentTarget.value);
      }
    }
  }
</script>

<form
  method="POST"
  {action}
  use:enhance={({ formElement }) => {
    return async ({ result }) => {
      if (result.type === "success") {
        await invalidate("app:events");
        formElement.reset();
        onSuccess();
      }
    };
  }}
  class="mb-6 space-y-4"
>
  {#if isEdit}
    <input type="hidden" name="id" value={event.id} />
  {/if}

  <div>
    <label class="mb-1 block text-sm font-medium" for="type">Type</label>
    <select
      id="type"
      name="type"
      required
      class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
    >
      <option value="event" selected={event.type === "event"}>Event</option>
      <option value="meeting" selected={event.type === "meeting"}>Meeting</option>
    </select>
  </div>

  <div>
    <label class="mb-1 block text-sm font-medium" for="name">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={event.name ?? ""}
      required
      class="w-full rounded border border-gray-300 px-3 py-2"
      on:input={updateSlug}
    />
  </div>

  <div>
    <label class="mb-1 block text-sm font-medium" for="slug">URL Slug</label>
    <input
      type="text"
      id="slug"
      name="slug"
      value={event.slug ?? ""}
      required
      pattern="[a-z0-9\-]+"
      class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
    />
  </div>

  <div>
    <label class="mb-1 block text-sm font-medium" for="description">Description (Markdown)</label>
    <textarea
      id="description"
      name="description"
      required
      rows="4"
      class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
      >{event.description ?? ""}</textarea
    >
  </div>

  <div>
    <label class="mb-1 block text-sm font-medium" for="location">Location</label>
    <input
      type="text"
      id="location"
      name="location"
      value={event.location ?? ""}
      class="w-full rounded border border-gray-300 px-3 py-2 focus:border-holdeman focus:ring-1 focus:ring-holdeman"
    />
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="mb-1 block text-sm font-medium" for="start_date">Start Date</label>
      <input
        type="datetime-local"
        id="start_date"
        name="start_date"
        value={fromSQLiteDateTime(event.start_date ?? null) ?? ""}
        required
        class="w-full rounded border border-gray-300 px-3 py-2"
      />
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium" for="end_date">End Date</label>
      <input
        type="datetime-local"
        id="end_date"
        name="end_date"
        value={fromSQLiteDateTime(event.end_date ?? null) ?? ""}
        class="w-full rounded border border-gray-300 px-3 py-2"
      />
    </div>
  </div>

  <div class="flex justify-end space-x-2">
    <button type="button" class="text-gray-600" on:click={onSuccess}>Cancel</button>
    <button type="submit" class="rounded bg-holdeman px-4 py-2 text-white">
      {isEdit ? "Save Changes" : "Create Event"}
    </button>
  </div>
</form>
