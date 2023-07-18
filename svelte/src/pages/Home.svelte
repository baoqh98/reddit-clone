<script>
  import { Modal, modalStore } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import Post from '../components/Post/Post.svelte';
  import CreatePost from '../components/Post/CreatePost.svelte';
  import Footer from '../components/Topic/Footer.svelte';

  export let data;
  const { posts, user } = data;

  function handleModal() {
    const modal = {
      type: 'alert',
      title: 'Example Alert',
      body: 'This is an example modal.',
    };
    modalStore.trigger(modal);
  }
</script>

<Modal />

<div class="container max-w-screen-lg py-6">
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-2">
      <div class="flex flex-col">
        <div class="mb-4">
          <CreatePost />
        </div>
        <div class="flex flex-col gap-3">
          <Post {posts} {user} />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div
        class="relative card border border-slate-300 p-3 rounded overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 right-0 h-[34px] bg-center bg-no-repeat bg-cover"
          style="background-image: url(https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png);"
        />
        <div class="relative flex flex-row gap-3 items-center mb-2 mt-2 z-100">
          <img
            class="w-[40px]"
            src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
            alt="home-banner"
          />
          <span class="text-[18px] font-semibold mt-3">Home</span>
        </div>
        <p class="text-sm font-normal">
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </p>
        <hr class="my-4" />
        <div class="flex flex-col gap-3">
          <button
            type="button"
            class="btn btn-sm variant-filled-secondary font-bold text-md"
            on:click={() => goto('/submit')}>Create Post</button
          >
          <button
            type="button"
            class="btn btn-sm border border-secondary-500 font-bold text-md text-secondary-500"
            on:click={handleModal}>Create Topic</button
          >
        </div>
      </div>
      <Footer />
    </div>
  </div>
</div>
