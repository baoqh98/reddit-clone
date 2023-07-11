<script>
  import { Avatar } from '@skeletonlabs/skeleton';
  import moment from 'moment';

  export let comment;
</script>

<div class="flex flex-row gap-4 mb-6">
  <div class="relative w-8">
    <Avatar
      class="w-8"
      src="https://styles.redditmedia.com/t5_2jwea9/styles/profileIcon_9l0887gthsr41.png?width=256&height=256&crop=256:256,smart&s=fa8e6574de07e4724b19dfed4779c45f819a6455"
    />
  </div>
  <div class="relative">
    <div class="flex flex-row gap-2">
      <span class="text-xs font-semibold">{comment.user.username}</span>
      <hr />
      <span class="text-xs font-light text-gray-500"
        >createAt {moment(comment.createdAt).fromNow()}</span
      >
    </div>
    <p class="text-sm">
      {comment.text}
    </p>
  </div>
</div>
