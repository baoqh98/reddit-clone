<script>
  import axios from 'axios';
  import { Autocomplete, Avatar } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { clickOutside } from '../../utils/DOM/clickOutside';
  import { apiEndpoint } from '../../utils/global/apiEndpoint';

  export let user;

  let searchValue = '';
  let isShowAutoComplete = false;
  let searchOptions = [];
  let isShowNav = false;

  function handleNavigation() {
    isShowNav = !isShowNav;
  }

  function onFlavorSelection(event) {
    searchValue = event.detail.label;
    isShowAutoComplete = false;
  }

  function onShowAutocomplete() {
    searchValue = '';
    isShowAutoComplete = !isShowAutoComplete;
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

  function logout() {}
</script>

<header class="bg-white shadow-md">
  <div class="flex items-center px-4 py-1">
    <div class="flex items-center">
      <a
        href="/"
        class="text-gray-700 font-bold text-lg flex flex-row items-center gap-2"
      >
        <img
          class="h-9"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/800px-Reddit_Logo_Icon.svg.png"
          alt="Logo"
        />
        <span>Reddit</span>
      </a>
    </div>
    <div
      class="relative md:flex flex flex-col items-center w-[25%] gap-1 rounded mx-auto"
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

    {#if user.isAuthenticated === true}
      <div class="flex items-center">
        <div
          class="relative z-[1000] flex items-center border border-transparent w-[200px] gap-2 hover:border-slate-300 hover:rounded cursor-pointer p-1"
          on:click={handleNavigation}
          use:clickOutside
          on:click_outside={() => (isShowNav = false)}
          on:keydown
        >
          <Avatar width={'w-9'} />
          <span class="font-bold text-sm">{user.username}</span>
          <span class="font-extralight text-gray-500 ml-auto">
            <i class="fa-solid fa-chevron-down" />
          </span>
          {#if isShowNav === true}
            <div
              class="absolute z-[999] flex flex-col bg-white w-fit right-0 top-[110%] py-3 px-1 border border-slate-300 rounded cursor-default"
            >
              <nav class="list-nav text-sm font-medium">
                <ul>
                  <li>
                    <a href={`/user/${user.username}`}>
                      <span>
                        <i class="fa-regular fa-circle-user" />
                      </span>
                      <span class="flex-auto">Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="/createTopic" class="rounded">
                      <span>
                        <i class="fa-solid fa-group-arrows-rotate" />
                      </span>
                      <span class="flex-auto">Create A Topic</span>
                    </a>
                  </li>
                </ul>
                <hr class="my-3" />
                <ul>
                  <li>
                    <a href="/">
                      <span class="flex-auto ml-8">Privacy Policy</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span class="flex-auto ml-8">Content Policy</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span class="flex-auto ml-8">User Agreement</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span class="flex-auto ml-8"
                        >Moderator Code of Conduct</span
                      >
                    </a>
                  </li>
                </ul>
              </nav>
              <hr class="my-3" />

              <a
                href="/auth/logout"
                class="btn btn-sm font-bold variant-filled-secondary w-full"
              >
                Logout
              </a>
            </div>{/if}
        </div>
      </div>
    {:else}
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
    {/if}
  </div>
</header>
