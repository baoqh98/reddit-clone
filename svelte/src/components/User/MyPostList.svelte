<script>
  import moment from 'moment';
  import MyPost from './MyPost.svelte';
  import MyPostComment from './MyPostComment.svelte';
  import EmptyPost from './EmptyPost.svelte';

  export let postByUser;
</script>

{#if postByUser.length === 0 || !postByUser}
  <EmptyPost />
{/if}

{#each postByUser as post}
  <div class="card rounded mb-4">
    <!-- POST -->
    <MyPost {post} {moment} />
    <!-- COMMENT -->
    {#each post.comments as comment}
      <MyPostComment {comment} {moment} />
    {/each}
  </div>
{/each}
