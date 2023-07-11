<script>
  import { Avatar } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import axios from 'axios';
  import moment from 'moment';
  import { onMount } from 'svelte';
  import { apiEndpoint } from '../../utils/global/apiEndpoint';

  let posts = [];
  onMount(async () => {
    const res = (await axios.get(apiEndpoint.postEndpoint)).data;
    posts = res.data;

    console.log(posts);
  });
</script>

{#each posts as post}
  <div
    on:click={() => goto(`/post/${post._id}`)}
    on:keydown
    class="card border border-slate-300 hover:border-slate-400 cursor-pointer overflow-hidden"
  >
    <div class="grid grid-cols-12 gap-1">
      <div class="col-span-1 bg-slate-100 p-2">
        <div class="flex flex-col gap-2 items-center leading-4">
          <button
            class="text-[28px] text-slate-400 hover:text-primary-500 hover:bg-slate-200 h-6 w-6"
          >
            <i
              class="fa-solid fa-caret-up rounded-sm active:-translate-y-1 ease-in-out duration-75"
            />
          </button>
          <div class="font-semibold text-sm">0</div>
          <button
            class="text-[28px] text-slate-400 hover:text-secondary-500 hover:bg-slate-200 h-6 w-6"
          >
            <i
              class="fa-solid fa-caret-down rounded-sm active:translate-y-1 ease-in-out duration-75"
            />
          </button>
        </div>
      </div>
      <div class="col-span-11 px-2 py-3">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center gap-2">
            <div class="flex flex-row items-center gap-1">
              <Avatar src="" width="w-6" rounded="rounded-full" />
              <div class="text-xs font-semibold">r/{post.topic.topic}</div>
            </div>
            <div class="h-4 border-[1px]" />
            <div class="text-xs font-light text-gray-500">
              Posted by u/{post.author.username}
              {moment(post.createdAt).fromNow()}
            </div>
          </div>
          <h1 class="text-black font-semibold">
            {post.title}
          </h1>
          {#if post.postType === 'media'}
            <img src={post.mediaLocation} alt={post.title} />
          {:else if post.postType === 'content'}
            <p class="text-[16px]">
              {post.content}
            </p>
          {/if}
        </div>
        <div class="flex gap-1 mt-2">
          <button
            class="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm font-bold text-sm text-gray-500"
          >
            <i class="fa-solid fa-message" />
            <div>{post.comments.length} Comments</div>
          </button>
          <button
            class="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm font-bold text-sm text-gray-500"
          >
            <i class="fa-solid fa-share" />
            <div>Share</div>
          </button>
          <button
            class="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm font-bold text-sm text-gray-500"
          >
            <i class="fa-solid fa-bookmark" />
            <div>Save</div>
          </button>
        </div>
      </div>
    </div>
  </div>
{/each}
