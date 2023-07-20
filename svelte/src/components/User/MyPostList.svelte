<script>
  import moment from 'moment';
  import MyPost from './MyPost.svelte';
  import MyPostComment from './MyPostComment.svelte';

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

<div class="card rounded">
  <!-- POST -->
  <MyPost {post} {moment} />
  <!-- COMMENT -->
  <MyPostComment {post} {moment} />
</div>
