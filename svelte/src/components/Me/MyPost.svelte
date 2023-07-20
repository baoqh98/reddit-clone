<script>
  import { Avatar, Toast } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import moment from 'moment';
  import axios from 'axios';
  import { apiEndpoint } from '../../utils/global/apiEndpoint';
  import { handleToastSetting } from '../../utils/DOM/handleToastSetting';
  import { vote, isVoted } from '$lib/votingHandler';

  let post = {
    vote: {
      voteScore: 3,
    },
    topic: { topic: 'Music' },
    author: {
      username: 'username',
    },
    comments: [],
    createdAt: Date.now(),
  };
</script>

<div class="card rounded overflow-hidden">
  <!-- POST -->
  <div
    class="overflow-hidden rounded rounded-b-none border hover:border-gray-500"
  >
    <div class="grid grid-cols-12 gap-1">
      <div class="col-span-1 p-2">
        <div class="flex flex-col gap-2 items-center leading-4">
          <button
            class="text-[28px] text-slate-400 hover:text-primary-500 hover:bg-slate-200 h-6 w-6"
          >
            <i
              class={`fa-solid fa-caret-up rounded-sm active:-translate-y-1 ease-in-out duration-75 ${'text-primary-500'}`}
            />
          </button>
          <div class="font-semibold text-sm">
            {!post.vote ? 0 : post.vote.voteScore}
          </div>
          <button
            class="text-[28px] text-slate-400 hover:text-secondary-500 hover:bg-slate-200 h-6 w-6"
          >
            <i
              class={`fa-solid fa-caret-down rounded-sm active:translate-y-1 ease-in-out duration-75 ${'text-secondary-500'}`}
            />
          </button>
        </div>
      </div>
      <div class="col-span-11 px-2 py-3">
        <div on:keydown class="flex flex-col gap-2 cursor-pointer">
          <div class="flex flex-row items-center gap-2">
            <div class="flex flex-row items-center gap-1">
              <Avatar src="" width="w-6" rounded="rounded-full" />
              <div class="text-xs font-semibold">u/{post.author.username}</div>
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

  <!-- COMMENT -->
  <div
    class="overflow-hidden rounded rounded-t-none border hover:border-gray-500"
  >
    <div class="grid grid-cols-12 px-2 py-3">
      <div class="col-span-1 flex justify-center">
        <span
          class="divider-vertical border-l-2 border-gray-200 border-dashed"
        />
      </div>
      <div class="col-span-11 bg-blue-50 py-1 px-4 rounded">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 text-xs">
            <span>u/{post.author.username}</span>
            <span class="text-gray-400">{moment(post.createdAt).fromNow()}</span
            >
          </div>
          <p class="text-md font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit alias
            tempora deserunt nemo possimus voluptatum ut sequi eius doloribus
            repellendus. Minus, eos? Eaque aspernatur ratione iste voluptas
            tempore fugit quos, doloremque cum qui beatae, dolor ducimus ipsa
            velit reiciendis repudiandae. Error reiciendis repudiandae quibusdam
            magni et laboriosam voluptatibus amet quidem!
          </p>
          <div class="flex flex-row gap-1 items-center">
            <button class="text-sm font-semibold text-gray-500 hover:underline"
              >Reply</button
            >
            <button
              class="text-sm font-semibold text-gray-500 px-2 p-1 hover:bg-gray-200 rounded"
              ><i class="fa-solid fa-ellipsis" /></button
            >
            <span class="divider-vertical h-5 mx-0 border-gray-300" />
            <button
              class="text-sm font-semibold text-gray-500 px-2 p-1 hover:bg-gray-200 rounded"
            >
              <i class="fa-solid fa-ban" />
              <span>Remove</span>
            </button>
            <button
              class="text-sm font-semibold text-gray-500 px-2 p-1 hover:bg-gray-200 rounded"
            >
              <i class="fa-solid fa-triangle-exclamation" />
              <span>Spam</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
