<script>
  import { enhance } from '$app/forms';
  import { invalidateAll, goto } from '$app/navigation';
  export let user;

  function handleEnhance({ formElement, formData, action, cancel, submitter }) {
    return async ({ result, update }) => {
      // update();
    };
  }
</script>

<form method="POST" action="?/comment" use:enhance>
  <div class="flex flex-col my-2 mx-16">
    <span class="text-sm">
      {#if user.isAuthenticated}
        Comment as <a href="/me" class="text-secondary-500">{user.username}</a>
      {:else}
        You need to log in to comment
      {/if}
    </span>
    <div class="flex flex-col w-full">
      <label class="label w-full">
        <textarea
          disabled={!user.isAuthenticated}
          name="comment"
          class="textarea resize-none focus:border-secondary-500 focus-within:border-secondary-500"
          rows="4"
          placeholder="What are your thoughts?"
        />
      </label>
      <button
        class={user.isAuthenticated
          ? `btn btn-sm variant-filled-secondary place-self-end`
          : `btn btn-sm variant-filled-secondary place-self-end bg-blue-500 text-white font-bold py-2 px-4 opacity-50 pointer-events-none`}
        >Comment</button
      >
    </div>
  </div>
</form>
