<script>
  /** @type {import('./$types').ActionData} */
  import { handleToastSetting } from '../../utils/DOM/handleToastSetting';
  import { Avatar } from '@skeletonlabs/skeleton';
  import { enhance } from '$app/forms';
  import moment from 'moment';

  let isEditing = false;
  let loading = false;

  export let comment;
  export let user;

  async function handleEnhance() {
    loading = true;
    return async ({ result, update }) => {
      if (result.type === 'success' && result.data.delete) {
        handleToastSetting('Deleted your comment!', 'bg-error-600');
        update();
      } else if (result.type === 'success' && result.data.edit) {
        update();
        handleToastSetting('Edited your comment!', 'bg-tertiary-600');
        isEditing = false;
      } else if (result.type === 'error') {
        handleToastSetting();
        update();
      }
      loading = false;
    };
  }
</script>

<div class="flex flex-row gap-4 mb-6">
  <div class="relative w-8">
    <Avatar
      class="w-8"
      src="https://styles.redditmedia.com/t5_2jwea9/styles/profileIcon_9l0887gthsr41.png?width=256&height=256&crop=256:256,smart&s=fa8e6574de07e4724b19dfed4779c45f819a6455"
    />
  </div>
  <div class="w-full">
    <div class="flex flex-row items-center gap-2">
      <a href={`/user/${comment.user.username}`} class="text-xs font-semibold"
        >{comment.user.username}</a
      >
      <span class="divider-vertical border-l border-gray-300 mx-0" />
      <span class="text-xs font-light text-gray-500"
        >createAt {moment(comment.createdAt).fromNow()}</span
      >
    </div>
    {#if isEditing === true && comment.user._id === user._id}
      <form action="?/editComment" method="POST" use:enhance={handleEnhance}>
        <input type="hidden" name="id" hidden value={comment._id} />
        <label class="label flex flex-col items-center justify-between mr-16">
          <textarea
            disabled={loading}
            name="commentToEdit"
            class="textarea text-sm resize-none focus:border-secondary-500 focus-within:border-secondary-500"
            rows="3"
            value={comment.text}
          />
          <button
            disabled={loading}
            class="btn btn-sm variant-filled-secondary place-self-end"
            >Submit</button
          >
        </label>
      </form>
    {:else}
      <p class="text-sm">
        {comment.text}
      </p>
    {/if}

    <div class="flex gap-2 mt-2">
      {#if comment.user._id === user._id}
        <button
          type="button"
          on:click={() => (isEditing = true)}
          class="flex items-center gap-2 hover:bg-gray-200 rounded-sm font-bold text-xs text-gray-500 p-1"
          ><i class="fa-solid fa-pen" />
          <span>Edit</span></button
        >
        <form
          action="?/deleteComment"
          method="POST"
          use:enhance={handleEnhance}
        >
          <input type="hidden" name="id" hidden value={comment._id} />
          <button
            class="flex items-center gap-2 hover:bg-gray-200 rounded-sm font-bold text-xs text-gray-500 p-1"
            ><i class="fa-regular fa-trash-can" />
            <span>Delete</span></button
          >
        </form>
      {/if}
    </div>
  </div>
</div>
