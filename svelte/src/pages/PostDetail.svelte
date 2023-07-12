<script>
  import { goto } from '$app/navigation';

  import Comment from '../components/Comment/Comment.svelte';
  import CreateComment from '../components/Comment/CreateComment.svelte';
  import UserToFollow from '../components/Follow/UserToFollow.svelte';
  import RuleInPostDetail from '../components/Rules/RuleInPostDetail.svelte';
  import PostInPostDetail from '../components/Post/PostInPostDetail.svelte';

  export let data;
  const { user } = data;
  $: post = data.post;
  $: comments = data.post.comments;
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
            <PostInPostDetail {post} />
            <!-- CREATE COMMENT -->
            <CreateComment {user} />
            <!-- COMMENTS -->
            <div class="my-4 mx-3">
              {#each comments as comment}
                <Comment {comment} />
              {/each}
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <UserToFollow />
          <RuleInPostDetail />
        </div>
      </div>
    </div>
  </div>
</section>
