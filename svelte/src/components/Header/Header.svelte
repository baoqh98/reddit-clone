<script>
  import { Avatar, Autocomplete } from "@skeletonlabs/skeleton";
  import { clickOutside } from "../../DOM/utils/clickOutside";
  let searchValue = "";
  let isShowAutoComplete = false;

  const flavorOptions = [
    {
      label: "Vanilla",
      value: "vanilla",
      keywords: "plain, basic",
      meta: { healthy: false },
    },
    {
      label: "Chocolate",
      value: "chocolate",
      keywords: "dark, white",
      meta: { healthy: false },
    },
    {
      label: "Strawberry",
      value: "strawberry",
      keywords: "fruit",
      meta: { healthy: true },
    },
  ];

  function onFlavorSelection(event) {
    searchValue = event.detail.label;
    isShowAutoComplete = false;

    console.log(searchValue);
  }

  function onShowAutocomplete() {
    searchValue = "";
    isShowAutoComplete = !isShowAutoComplete;
  }
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
          placeholder="Search Reddit"
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
            options={flavorOptions}
            on:selection={onFlavorSelection}
            class="text-sm"
          />
        </div>
      {/if}
    </div>

    <div class="flex items-center">
      <a href="/signup" class="text-gray-700 hover:text-black mr-4">Sign Up</a>
      <a
        href="/login"
        class="bg-primary-500 hover:bg-primary-600 text-white font-bold btn rounded-full"
      >
        Login
      </a>
    </div>
  </div>
</header>
