<script>
  import { Avatar } from '@skeletonlabs/skeleton';
  import Comment from '../components/Comment/Comment.svelte';
  import CreateComment from '../components/Comment/CreateComment.svelte';
  import { goto } from '$app/navigation';
  import moment from 'moment';

  export let post;

  const comments = post.comments;
</script>

<section class="bg-zinc-800 h-full">
  <div class="container max-w-screen-xl bg-surface-500 h-full">
    <!-- HEAD -->
    <div class="bg-neutral-950 flex flex-row text-white">
      <div class="container max-w-5xl">
        <div class="flex flex-row justify-left w-full gap-4 py-3">
          <div class="flex gap-4 text-md items-center">
            <button><i class="fa-solid fa-caret-up" /></button>
            <span>0</span>
            <button><i class="fa-solid fa-caret-down" /></button>
          </div>
          <div class="flex items-center gap-2 w-[80%] mr-auto">
            <span><i class="fa-solid fa-bars" /></span>
            <h1 class="truncate">
              {post.title}
            </h1>
          </div>
          <div class="">
            <button
              on:click={() => goto('/')}
              class="flex flex-row gap-2 items-center"
              ><i class="fa-solid fa-circle-xmark" />
              <span>close</span></button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- BODY -->
    <div class="container max-w-5xl py-6">
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <div class="card border border-slate-300 overflow-hidden">
            <div class="grid grid-cols-12 gap-1">
              <div class="col-span-1 p-2">
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
                      <div class="text-xs font-semibold">
                        r/{post.topic.topic}
                      </div>
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
                  {#if post.postType === 'content'}
                    <p class="text-[16px]">
                      {post.content}
                    </p>
                  {:else if post.postType === 'media'}
                    <img src={post.mediaLocation} alt={post.title} />
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
            <!-- CREATE COMMENT -->
            <CreateComment />
            <!-- COMMENTS -->
            <div class="my-4 mx-3">
              {#each comments as comment}
                <Comment {comment} />
              {/each}
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div
            class="relative card p-3 border border-slate-300 rounded overflow-hidden"
          >
            <div
              class="absolute z-10 top-0 left-0 right-0 h-[42px] bg-secondary-500"
            >
              <div class="flex h-full mx-4 gap-2 flex-row items-center">
                <span class="text-white">
                  <i class="fa-solid fa-user-plus" />
                </span>
                <p class="text-md font-semibold text-white">User to follow</p>
              </div>
            </div>
            <div class="mt-[42px]">
              <ul>
                {#each ['Lorem, ipsum.', 'Lorem, ipsum.', 'Lorem, ipsum.'] as user}
                  <li
                    class="flex flex-row items-center justify-between text-xs text-secondary-500"
                  >
                    <span class="cursor-default">
                      u/{user}
                    </span>
                    <button class="btn btn-sm">
                      <i class="fa-solid fa-plus" />
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
          <div
            class="relative card p-3 border border-slate-300 rounded overflow-hidden"
          >
            <div
              class="absolute z-10 top-0 left-0 right-0 h-[42px] bg-secondary-500"
            >
              <div class="flex h-full mx-4 gap-2 flex-row items-center">
                <span class="text-white">
                  <i class="fa-solid fa-gavel" />
                </span>
                <p class="text-md font-semibold text-white">Rules</p>
              </div>
            </div>
            <div class="mt-[42px]">
              <ol>
                {#each [' Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'Lorem, ipsum.', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'] as rule, i}
                  <li class="flex flex-row text-sm font-semibold border-b py-2">
                    {`${i + 1}. `}{rule}
                  </li>
                {/each}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
