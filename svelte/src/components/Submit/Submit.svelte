<script>
  import { FileDropzone, TabGroup, Tab } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import axios from "axios";
  import { url_api } from "../../utils/global/url";

  const topicEndpoint = `${url_api}/topic`;

  let topics = [];

  let nsfw = false;
  let post = {
    title: "",
    content: "",
    nsfw: false,
    topic: "",
    mediaLocation: "",
  };

  // Tab
  let tabSet = 0;

  function toggleNsfw() {
    nsfw = !nsfw;
    post.nsfw = nsfw;
  }
  function handleOnkeyDownSpan(event) {
    if (event.key === "Enter") {
      toggleNsfw();
    }
  }

  async function submitPost() {
    console.log({ ...post });
  }

  onMount(async () => {
    const res = (await axios.get(topicEndpoint)).data;
    topics = res.data;
  });
</script>

<div class="flex flex-col my-4 gap-4">
  <div class="flex flex-col">
    <div class="flex flex-row justify-between items-center mb-2">
      <h1 class="text-lg font-semibold text-[20px]">Create a Post</h1>
      <button
        class="px-4 py-2 hover:bg-gray-300 rounded-full font-bold text-secondary-500 active:bg-gray-400"
        >Drafts
        <span
          class="px-1 bg-gray-400 text-sm text-gray-100 font-semibold rounded-sm"
          >0</span
        >
      </button>
    </div>
    <hr />
  </div>

  <div class="w-[50%]">
    <label class="label">
      <select
        class="select border-slate-300 focus:border-secondary-500 focus-within:border-secondary-500"
        bind:value={post.topic}
      >
        {#if post.topic === ""}
          <option value="">Select a topic</option>
        {/if}
        {#each topics as topic}
          <option value={topic.topic}>{topic.topic}</option>
        {/each}
      </select>
    </label>
  </div>

  <div class="card border border-slate-300 p-3 flex flex-col gap-4">
    <TabGroup>
      <Tab
        id="things"
        bind:group={tabSet}
        name="content"
        class={`text-[16px] border-none ${
          tabSet === 0 ? "text-secondary-500" : "text-gray-300"
        }`}
        value={0}
      >
        <svelte:fragment slot="lead"
          ><i class="fa-solid fa-paragraph" /></svelte:fragment
        >
        <span>Content</span>
      </Tab>
      <Tab
        bind:group={tabSet}
        name="media"
        value={1}
        class={`text-[16px] border-none ${
          tabSet === 1 ? "text-secondary-500" : "text-gray-300"
        }`}
      >
        <svelte:fragment slot="lead"
          ><i class="fa-solid fa-image" /></svelte:fragment
        >
        <span>Image</span></Tab
      >
      <!-- Tab Panels --->
      <svelte:fragment slot="panel">
        <label class="label mb-4">
          <input
            class="input rounded focus:border-secondary-500 focus-within:border-secondary-500"
            type="text"
            placeholder="Title"
            bind:value={post.title}
          />
        </label>
        {#if tabSet === 0}
          <label class="label">
            <textarea
              class="textarea focus:border-secondary-500 focus-within:border-secondary-500"
              rows="4"
              placeholder="Content"
              bind:value={post.content}
            />
          </label>
        {:else if tabSet === 1}
          <FileDropzone
            name="import_media"
            class="active:border-secondary-500 focus:border-secondary-500 focus-within:border-secondary-500"
          >
            <svelte:fragment slot="lead"
              ><i class="fa-solid fa-photo-film text-[24px]" /></svelte:fragment
            >
            <svelte:fragment slot="message"
              >Drag and or click to import image</svelte:fragment
            >
            <svelte:fragment slot="meta"
              >PNG, JPEG and GIF allowed</svelte:fragment
            >
          </FileDropzone>
        {/if}
        <div class="flex justify-end mt-4">
          <span
            on:click={toggleNsfw}
            on:keydown={handleOnkeyDownSpan}
            class={nsfw
              ? "chip variant-filled-secondary"
              : "chip bg-slate-200  hover:bg-slate-400"}
          >
            <span><i class="fa-solid fa-check" /></span>
            <span>not safe for work</span>
          </span>
        </div>
      </svelte:fragment>
    </TabGroup>

    <hr />

    <div class="flex justify-end">
      <button class="btn variant-filled-primary" on:click={submitPost}
        >Post</button
      >
    </div>
  </div>
</div>
