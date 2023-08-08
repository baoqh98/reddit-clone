<script>
  import { goto } from '$app/navigation';
  import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import { clickOutside } from '../../utils/DOM/clickOutside';
  import DeleteModalBox from './DeleteModalBox.svelte';

  export let post;

  // open and close menu bar of post
  let selectedPost = '';
  let isOpenMenuBar = false;
  function handleMenuPost(postId) {
    selectedPost = postId;
    isOpenMenuBar = !isOpenMenuBar;
  }

  const modalComponentRegistry = {
    deleteModalBox: {
      ref: DeleteModalBox,
      props: {
        post,
        parent: Modal,
      },
    },
  };

  const modal = {
    type: 'component',
    component: 'deleteModalBox',
  };

  function handleModal() {
    modalStore.trigger(modal);
  }
</script>

<div class="relative ml-auto">
  <button
    on:click={() => handleMenuPost(post.id)}
    class="btn-sm hover:variant-filled-surface rounded"
  >
    <i class="fa-solid fa-ellipsis pointer-events-none" />
  </button>
  {#if post.id === selectedPost && isOpenMenuBar}
    <div
      use:clickOutside
      on:click_outside={handleMenuPost}
      class="absolute top-[110%] right-0 z-100 flex flex-col gap-1 card bg-white shadow-md overflow-hidden"
    >
      <Modal background="opacity-25" components={modalComponentRegistry} />
      <button
        on:click={handleModal}
        class="btn btn-sm justify-start hover:bg-red-200 hover:text-red-900 rounded-none flex gap-1 items-center text-sm text-left"
      >
        <i class="fa-solid fa-trash-can pointer-events-none" />
        <span class="pointer-events-none">Delete</span>
      </button>

      <button
        class="btn btn-sm justify-start hover:bg-blue-200 hover:text-blue-900 rounded-none flex gap-1 items-center text-sm"
      >
        <i class="fa-solid fa-pen" />
        <span>Edit</span>
      </button>
    </div>
  {/if}
</div>
