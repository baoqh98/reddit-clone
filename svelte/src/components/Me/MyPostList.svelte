<script>
  import { Avatar, Toast } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import moment from 'moment';
  import axios from 'axios';
  import { apiEndpoint } from '../../utils/global/apiEndpoint';
  import { handleToastSetting } from '../../utils/DOM/handleToastSetting';
  import { vote, isVoted } from '$lib/votingHandler';
  import MyPostComment from './MyPostComment.svelte';
  import MyPost from './MyPost.svelte';

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
