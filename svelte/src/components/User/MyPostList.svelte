<script>
  import moment from 'moment';
  import MyPost from './MyPost.svelte';
  import MyPostComment from './MyPostComment.svelte';
  export let postByUser;
</script>

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
