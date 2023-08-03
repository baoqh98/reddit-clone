<script>
  /** @type {import('./$types').PageLoad} */
  import { Avatar, Toast } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import moment from 'moment';
  import axios from 'axios';
  import { apiEndpoint } from '../../utils/global/apiEndpoint';
  import { handleToastSetting } from '../../utils/DOM/handleToastSetting';
  import { vote, isVoted } from '$lib/votingHandler';
  import { clickOutside } from '../../utils/DOM/clickOutside';

  export let posts;
  export let user;

  let isShowMenuBar = false;
  function handleMenuPost() {
    isShowMenuBar = !isShowMenuBar;
  }

  const upvote = async (postId) => {
    try {
      await vote(`${apiEndpoint.voteEndpoint}/upvote`, 'UPVOTE', user, postId);
      const postsData = (await axios.get(apiEndpoint.postEndpoint)).data;
      posts = postsData.data;
    } catch (error) {
      handleToastSetting(error.message);
    }
  };
  const downvote = async (postId) => {
    try {
      await vote(
        `${apiEndpoint.voteEndpoint}/downvote`,
        'DOWNVOTE',
        user,
        postId
      );
      const postsData = (await axios.get(apiEndpoint.postEndpoint)).data;
      posts = postsData.data;
    } catch (error) {
      handleToastSetting(error.message);
    }
  };
</script>

<Toast />

{#each posts as post}
  <div
    class="card border border-slate-300 hover:border-slate-400 overflow-hidden"
  >
    <div class="grid grid-cols-12 gap-1">
      <div class="col-span-1 bg-slate-100 p-2">
        <div class="flex flex-col gap-2 items-center leading-4">
          <button
            on:click={() => upvote(post.id)}
            class="text-[28px] text-slate-400 hover:text-primary-500 hover:bg-slate-200 h-6 w-6"
          >
            <i
              class={`fa-solid fa-caret-up rounded-sm active:-translate-y-1 ease-in-out duration-75 ${
                isVoted(post, user, 'UPVOTE') && 'text-primary-500'
              }`}
            />
          </button>
          <div class="font-semibold text-sm">
            {!post.vote ? 0 : post.vote.voteScore}
          </div>
          <button
            on:click={() => downvote(post.id)}
            class="text-[28px] text-slate-400 hover:text-secondary-500 hover:bg-slate-200 h-6 w-6"
          >
            <i
              class={`fa-solid fa-caret-down rounded-sm active:translate-y-1 ease-in-out duration-75 ${
                isVoted(post, user, 'DOWNVOTE') && 'text-secondary-500'
              }`}
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
            {#if user.username === post.author.username}
              <div class="relative ml-auto">
                <button
                  on:click={handleMenuPost}
                  use:clickOutside
                  on:click_outside={() => (isShowMenuBar = false)}
                  class="btn-sm hover:variant-filled-surface rounded"
                >
                  <i class="fa-solid fa-ellipsis" />
                </button>
                {#if isShowMenuBar}
                  <div
                    class="absolute top-[110%] right-0 z-100 flex flex-col gap-1 card bg-white shadow-md overflow-hidden"
                  >
                    <button
                      class="btn btn-sm justify-start hover:bg-red-200 hover:text-red-900 rounded-none flex gap-1 items-center text-sm text-left"
                    >
                      <i class="fa-solid fa-trash-can" />
                      <span>Delete</span>
                    </button>
                    <button
                      class="btn btn-sm justify-start hover:bg-red-200 hover:text-red-900 rounded-none flex gap-1 items-center text-sm"
                    >
                      <i class="fa-solid fa-pen" />
                      <span>Edit</span>
                    </button>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
          <div
            class="flex flex-col gap-2 cursor-pointer"
            on:click={() => goto(`/post/${post.id}`)}
            on:keydown
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
