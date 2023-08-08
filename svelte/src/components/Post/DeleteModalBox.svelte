<script>
  import { enhance } from '$app/forms';
  import {
    Modal,
    ProgressRadial,
    Toast,
    modalStore,
  } from '@skeletonlabs/skeleton';

  export let post;
  export let parent;

  parent = Modal;

  let loading = false;
  function enhancer(event) {
    loading = true;
    return async ({ result, update }) => {
      modalStore.close();
      update();
      loading = false;
    };
  }
</script>

<Toast />

<div class=" bg-white w-modal h-auto p-4 space-y-4 rounded-container-token md">
  <header class="modal-header text-2xl font-bold">
    {loading ? 'Loading...' : 'Please confirm'}
  </header>
  {#if loading}
    <div class="flex justify-center">
      <ProgressRadial
        width="w-12"
        stroke={150}
        meter="stroke-secondary-500"
        track="stroke-secondary-500/30"
      />
    </div>
  {:else}
    <div>Are you sure you wish to delete this post?</div>
  {/if}
  <footer class="modal-footer flex justify-end space-x-2">
    <button
      disabled={loading}
      on:click={modalStore.close}
      class="btn bg-red-500 text-white">Cancel</button
    >
    <form action="?/deletePost" method="POST" use:enhance={enhancer}>
      <input type="hidden" name="postIdDelete" value={post.id} />
      <button
        disabled={loading}
        class="btn variant-filled-surface hover:variant-filled"
        >{!loading ? 'Confirm' : 'Loading'}</button
      >
    </form>
    <slot />
  </footer>
</div>
