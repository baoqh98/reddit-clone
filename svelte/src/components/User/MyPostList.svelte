<script>
  import moment from 'moment';
  import MyPost from './MyPost.svelte';
  import MyPostComment from './MyPostComment.svelte';
  import EmptyPost from './EmptyPost.svelte';

  export let postByUser;
  export let user;
</script>

{#if postByUser.length === 0 || !postByUser}
  <div class="text-center text-lg italic font-semibold my-5">
    User have no post here
  </div>
  <EmptyPost />
  <EmptyPost />
  <EmptyPost />
  <EmptyPost />
  <EmptyPost />
  <EmptyPost />
  <EmptyPost />
  <EmptyPost />
  <EmptyPost />
{/if}

{#each postByUser as post}
  <div class="card rounded mb-4">
    <!-- POST -->
    <MyPost {user} {post} {moment} />
    <!-- COMMENT -->

    {#each post.comments as comment}
      <MyPostComment {comment} {moment} />
    {/each}
  </div>
{/each}
