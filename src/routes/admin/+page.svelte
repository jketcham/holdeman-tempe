<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import type { ActionResult } from "@sveltejs/kit";
  import { formatDate, fromSQLiteDateTime } from "$lib/utils/dates";
  import BannerForm from "../../components/BannerForm.svelte";
  import LinkForm from "../../components/LinkForm.svelte";
  import Pagination from "../../components/Pagination.svelte";

  export let data: PageData;

  let showNewLinkForm = false;
  let showNewBannerForm = false;
  let editingLink: number | null = null;
  let editingBanner: number | null = null;
  let currentBannerPage = parseInt($page.url.searchParams.get("bannerPage") || "1");
  let currentLinkPage = parseInt($page.url.searchParams.get("linkPage") || "1");

  function getDeleteEnhance(type: "link" | "banner", label: string) {
    return ({ cancel }: { cancel: () => void }) => {
      if (!confirm(`Are you sure you want to delete this ${type}: "${label}"?`)) {
        cancel();
        return;
      }
      return async ({ result }: { result: ActionResult }) => {
        if (result.type === "success") {
          await invalidate(type === "link" ? "app:links" : "app:banners");
        }
      };
    };
  }

  async function handleBannerPageChange(page: number) {
    currentBannerPage = page;
    const url = new URL($page.url);
    url.searchParams.set("bannerPage", page.toString());
    await goto(url, { keepFocus: true });
    await invalidate("app:banners");
  }

  async function handleLinkPageChange(page: number) {
    currentLinkPage = page;
    const url = new URL($page.url);
    url.searchParams.set("linkPage", page.toString());
    await goto(url, { keepFocus: true });
    await invalidate("app:links");
  }
</script>

<div class="mx-auto max-w-4xl p-6">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Admin Dashboard</h1>
    <form method="POST" action="/admin/logout">
      <button type="submit" class="text-red-600 hover:text-red-800">Logout</button>
    </form>
  </div>

  <div class="space-y-8">
    <!-- Banner Updates Section -->
    <div class="md:rounded-lg md:bg-white md:p-6 md:shadow">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold">Banner Updates</h2>
        <button
          class="rounded bg-holdeman px-4 py-2 text-white"
          on:click={() => (showNewBannerForm = !showNewBannerForm)}
        >
          {showNewBannerForm ? "Cancel" : "New Banner"}
        </button>
      </div>

      {#if showNewBannerForm}
        <BannerForm onSuccess={() => (showNewBannerForm = false)} />
      {/if}

      {#if editingBanner}
        <BannerForm
          banner={data.bannerUpdates.bannerUpdates.find((b) => b.id === editingBanner)}
          action="?/updateBanner"
          onSuccess={() => (editingBanner = null)}
        />
      {/if}

      <div class="space-y-4">
        {#each data.bannerUpdates.bannerUpdates as banner}
          <div class="rounded border p-4">
            <h3 class="font-bold">{banner.title}</h3>
            <p class="text-sm text-gray-600">{banner.content}</p>
            <div class="mt-2 flex items-center justify-between">
              <div class="flex flex-col gap-1 text-sm text-gray-500">
                {#if banner.start_date}
                  <span
                    >From: {formatDate(banner.start_date, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span
                  >
                {/if}
                {#if banner.end_date}
                  <span
                    >Until: {formatDate(banner.end_date, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span
                  >
                {/if}
              </div>
              <div class="mt-auto flex space-x-2">
                <button
                  class="text-blue-600 hover:text-blue-800"
                  on:click={() => (editingBanner = banner.id)}
                >
                  Edit
                </button>
                <form
                  method="POST"
                  action="?/deleteBanner"
                  use:enhance={getDeleteEnhance("banner", banner.title)}
                >
                  <input type="hidden" name="id" value={banner.id} />
                  <button type="submit" class="text-red-600 hover:text-red-800">Delete</button>
                </form>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-4">
        <Pagination
          currentPage={currentBannerPage}
          totalPages={data.bannerUpdates.totalPages}
          onPageChange={handleBannerPageChange}
        />
      </div>
    </div>

    <!-- Links Section -->
    <div class="md:rounded-lg md:bg-white md:p-6 md:shadow">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold">Links</h2>
        <button
          class="rounded bg-holdeman px-4 py-2 text-white"
          on:click={() => (showNewLinkForm = !showNewLinkForm)}
        >
          {showNewLinkForm ? "Cancel" : "New Link"}
        </button>
      </div>

      {#if showNewLinkForm}
        <LinkForm onSuccess={() => (showNewLinkForm = false)} />
      {/if}

      {#if editingLink}
        <LinkForm
          link={data.links.links.find((l) => l.id === editingLink)}
          action="?/updateLink"
          onSuccess={() => (editingLink = null)}
        />
      {/if}

      <div class="space-y-4">
        {#each data.links.links as link}
          <div class="rounded border p-4">
            <h3 class="font-bold">{link.link_label}</h3>
            <p class="text-sm text-gray-600">{link.link_url}</p>
            <p class="text-sm text-gray-500">Order: {link.order}</p>
            <div class="mt-2 flex items-center justify-between">
              <div class="flex flex-col gap-1 text-sm text-gray-500">
                {#if link.start_date}
                  <span
                    >From: {formatDate(link.start_date, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span
                  >
                {/if}
                {#if link.end_date}
                  <span
                    >Until: {formatDate(link.end_date, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span
                  >
                {/if}
              </div>
              <div class="mt-auto flex space-x-2">
                <button
                  class="text-blue-600 hover:text-blue-800"
                  on:click={() => (editingLink = link.id)}
                >
                  Edit
                </button>
                <form
                  method="POST"
                  action="?/deleteLink"
                  use:enhance={getDeleteEnhance("link", link.link_label)}
                >
                  <input type="hidden" name="id" value={link.id} />
                  <button type="submit" class="text-red-600 hover:text-red-800">Delete</button>
                </form>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-4">
        <Pagination
          currentPage={currentLinkPage}
          totalPages={data.links.totalPages}
          onPageChange={handleLinkPageChange}
        />
      </div>
    </div>

    <!-- Link Stats Section -->
    <div class="md:rounded-lg md:bg-white md:p-6 md:shadow">
      <h2 class="mb-4 text-xl font-bold">Link Statistics</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="py-2 text-left">Label</th>
              <th class="py-2 text-left">URL</th>
              <th class="py-2 text-right">Clicks</th>
              <th class="py-2 text-right">Last Clicked</th>
            </tr>
          </thead>
          <tbody>
            {#each data.linkStats.results as stat}
              <tr class="border-t">
                <td class="py-2">{stat.link_label}</td>
                <td class="py-2">{stat.link_url}</td>
                <td class="py-2 text-right">{stat.click_count}</td>
                <td class="py-2 text-right">
                  {#if stat.last_clicked}
                    {formatDate(stat.last_clicked)}
                  {:else}
                    Never
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
