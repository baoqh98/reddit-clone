<script>
  import { Avatar } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import MenuBar from '../Post/MenuBar.svelte';

  export let post;
  export let user;
  export let moment;
</script>

<div class="rounded rounded-b-none border hover:border-gray-500">
  <div class="grid grid-cols-12 gap-1">
    <div class="col-span-1 p-2">
      <div class="flex flex-col gap-2 items-center leading-4">
        <button
          class="text-[28px] text-slate-400 hover:text-primary-500 hover:bg-slate-200 h-6 w-6"
        >
          <i
            class={`fa-solid fa-caret-up rounded-sm active:-translate-y-1 ease-in-out duration-75`}
          />
        </button>
        <div class="font-semibold text-sm">
          {!post.vote ? 0 : post.vote.voteScore}
        </div>
        <button
          class="text-[28px] text-slate-400 hover:text-secondary-500 hover:bg-slate-200 h-6 w-6"
        >
          <i
            class={`fa-solid fa-caret-down rounded-sm active:translate-y-1 ease-in-out duration-75`}
          />
        </button>
      </div>
    </div>
    <div class="col-span-11 px-2 py-3">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row items-center gap-2">
          <div class="flex flex-row items-center gap-1">
            <Avatar src="" width="w-6" rounded="rounded-full" />
            <div class="text-xs font-semibold">
              u/<a href={`/user/${post.author.username}`}>
                {post.author.username}
              </a>
            </div>
          </div>
          <div class="h-4 border-[1px]" />
          <div class="text-xs font-light text-gray-500">
            posted by u/{post.author.username}
            {moment(post.createdAt).fromNow()}
          </div>
          {#if user.username === post.author.username}
            <MenuBar {post} />
          {/if}
        </div>
        <div
          on:click={() => goto(`/post/${post.id}`)}
          on:keydown
          class="flex flex-col gap-1"
        >
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
      </div>
      <div class="flex gap-1 mt-2">
        <button
          on:click={() => goto(`/post/${post.id}`)}
          on:keydown
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
