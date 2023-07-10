<script>
  import { FileDropzone, TabGroup, Tab, Toast } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import axios, { AxiosError } from 'axios';
  import { apiEndpoint } from '../utils/global/apiEndpoint';
  import { handleToastSetting } from '../utils/DOM/handleToastSetting';

  export let user;

  let topics = [];
  let files;
  let nsfw = false;
  let tabSet = 0;
  let post = {
    title: '',
    content: '',
    topic: '',
    nsfw,
  };

  function toggleNsfw() {
    nsfw = !nsfw;
    post.nsfw = nsfw;
  }
  function handleOnkeyDownSpan(event) {
    if (event.key === 'Enter') {
      toggleNsfw();
    }
  }

  async function submitPost() {
    try {
      if (!user.isAuthenticated)
        throw new AxiosError(
          "Can't submit Post because you haven't logged in yet!",
          '401'
        );
      let res;
      if (tabSet === 0) {
        if (!post.topic) {
          throw new AxiosError('Please select topic', '400');
        }
        res = await axios.post(
          apiEndpoint.postEndpoint,
          {
            authorId: user.id,
            ...post,
          },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
      } else {
        const formData = new FormData();
        if (!files) throw new AxiosError('There is no file!', '400');
        if (!post.topic) throw new AxiosError('Please select topic', '400');
        if (!post.title) throw new AxiosError('Please input the title', '400');
        formData.append('file', files[0]);
        formData.append('authorId', user.id);
        for (const key in post) {
          formData.append(key, post[key]);
        }
        res = await axios.post(apiEndpoint.photoPostEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
      }
      if (res.data.status === 'success') {
        handleToastSetting(
          'Created Post successfully!',
          'variant-filled-success',
          undefined,
          (response) => {
            if (response.status === 'closed') goto('/');
          }
        );
      }
    } catch (error) {
      if (error.code.startsWith('4' || '5')) {
        handleToastSetting(error.message);
      } else {
        handleToastSetting(error.response.data.message);
      }
    }
  }

  onMount(async () => {
    const res = (await axios.get(apiEndpoint.topicEndpoint)).data;
    topics = res.data;
  });
</script>

<div class="flex flex-col my-4 gap-4">
  <Toast />
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
        {#if post.topic === ''}
          <option value="">Select a topic</option>
        {/if}
        {#each topics as topic}
          <option value={topic._id}>{topic.topic}</option>
        {/each}
      </select>
    </label>
  </div>

  <div class="card border border-slate-300 p-3 flex flex-col gap-4">
    <TabGroup>
      <Tab
        class="border-none {tabSet === 0
          ? 'bg-secondary-50'
          : 'hover:bg-secondary-50 hover:text-gray-400 text-gray-400'}"
        bind:group={tabSet}
        name="content"
        value={0}
      >
        <div
          class="flex flex-row items-center h-full gap-2 {tabSet === 0
            ? 'text-secondary-500 hover:text-secondary-500 [&>i]:rounded [&>i]:text-secondary-500'
            : ''}"
        >
          <i class="fa-solid fa-paragraph" />
          <span class="text-md font-bold">Content</span>
        </div>
      </Tab>
      <Tab
        class="border-none {tabSet === 1
          ? 'bg-secondary-50'
          : 'hover:bg-secondary-50 hover:text-gray-400 text-gray-400'}"
        bind:group={tabSet}
        name="image"
        value={1}
      >
        <div
          class="flex flex-row items-center h-full gap-2 {tabSet === 1
            ? 'text-secondary-500 hover:text-secondary-500 [&>i]:rounded [&>i]:text-secondary-500'
            : ''}"
        >
          <i class="fa-solid fa-image" />
          <span class="text-md font-bold">Image</span>
        </div></Tab
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
            bind:files
          >
            <svelte:fragment slot="lead"
              ><i class="fa-solid fa-photo-film text-[24px]" /></svelte:fragment
            >
            <svelte:fragment slot="message">
              {files
                ? `${'filename: ' + files[0].name}`
                : 'Drag and or click to import image'}
            </svelte:fragment>
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
              ? 'chip variant-filled-secondary'
              : 'chip bg-slate-200  hover:bg-slate-400'}
          >
            <span><i class="fa-solid fa-check" /></span>
            <span>not safe for work</span>
          </span>
        </div>
      </svelte:fragment>
    </TabGroup>

    <hr />

    <div class="flex justify-end">
      <button
        type="submit"
        class="btn variant-filled-primary"
        on:click={submitPost}>Post</button
      >
    </div>
  </div>
</div>
