<script>
  import { Autocomplete } from '@skeletonlabs/skeleton';
  import { clickOutside } from '../../utils/DOM/clickOutside';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { apiEndpoint } from '../../utils/global/apiEndpoint';

  export let isAuthenticated;

  let searchValue = '';
  let isShowAutoComplete = false;
  let searchOptions = [];

  function onFlavorSelection(event) {
    searchValue = event.detail.label;
    isShowAutoComplete = false;
  }

  function onShowAutocomplete() {
    searchValue = '';
    isShowAutoComplete = !isShowAutoComplete;
  }

  async function logout() {
    try {
      const res = await axios.get(apiEndpoint.logoutEndpoint, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onMount(async () => {
    const res = await axios.get(apiEndpoint.topicEndpoint);
    searchOptions = res.data.data.map((item) => ({
      label: item.topic,
      value: item.topic,
      keywords: item.topic,
      meta: item._id,
    }));
  });
</script>

<header class="bg-white shadow-md">
  <div class="flex items-center justify-between px-4 py-3">
    <div class="flex items-center">
      <a href="/" class="text-gray-700 font-bold text-lg">reddit</a>
    </div>
    <div
      class="relative md:flex flex flex-col items-center w-[25%] gap-1 rounded"
    >
      <div
        class="input-group grid-cols-[auto_1fr_auto] focus:border-secondary-500 focus-within:border-secondary-500 rounded-b-[-16px]"
      >
        <div class="input-group-shim">
          <i class="fa-solid fa-magnifying-glass" />
        </div>
        <input
          bind:value={searchValue}
          type="search"
          placeholder="Search Reddit Post"
          class="focus:border-secondary-500 focus-within:border-secondary-500 rounded-t-lg"
          on:click={onShowAutocomplete}
        />
      </div>
      {#if isShowAutoComplete}
        <div
          class="card p-2 absolute top-11 overflow-y-auto w-full"
          tabindex="-1"
          use:clickOutside
          on:click_outside={onShowAutocomplete}
        >
          <Autocomplete
            bind:input={searchValue}
            options={searchOptions}
            on:selection={onFlavorSelection}
            class="text-sm"
          />
        </div>
      {/if}
    </div>

    {#if isAuthenticated === true}
      <button class="btn variant-ghost-primary" on:click={logout}>logout</button
      >
    {/if}
    <div class="flex items-center">
      <a href="/auth/register" class="text-gray-700 hover:text-black mr-4"
        >Sign Up</a
      >
      <a
        href="/auth/login"
        class="bg-primary-500 hover:bg-primary-600 text-white font-bold btn rounded-full"
      >
        Login
      </a>
    </div>
  </div>
</header>
