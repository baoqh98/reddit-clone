<script>
  import { page } from '$app/stores';
  import { clickOutside } from '../../utils/DOM/clickOutside';
  let isShowMenu = false;
  export let comment;
  export let moment;

  function handleMenu() {
    isShowMenu = !isShowMenu;
  }
</script>

{#if comment.user.username === $page.params.slug}
  <div
    class="relative rounded rounded-t-none border border-transparent hover:border-gray-500"
  >
    <div class="grid grid-cols-12 px-2 py-3">
      <div class="col-span-1 flex justify-center">
        <span
          class="divider-vertical border-l-2 border-gray-200 border-dashed"
        />
      </div>
      <div class="col-span-11 bg-blue-50 py-1 px-4 rounded">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 text-xs">
            <span>u/{comment.user.username}</span>
            <span class="text-gray-400"
              >{moment(comment.createdAt).fromNow()}</span
            >
          </div>
          <p class="text-md font-normal">
            {comment.text}
          </p>
          <div class="flex flex-row gap-1 items-center">
            <button class="text-sm font-semibold text-gray-500 hover:underline"
              >Reply</button
            >
            <div class="relative">
              <button
                on:click={handleMenu}
                class="text-sm font-semibold text-gray-500 px-2 p-1 hover:bg-gray-200 rounded"
                ><i class="fa-solid fa-ellipsis" /></button
              >
              {#if isShowMenu}
                <div
                  class="absolute top-[110%] left-0 z-100 flex flex-col bg-white rounded shadow border border-gray-200 divide-y"
                  use:clickOutside
                  on:click_outside={handleMenu}
                >
                  <button
                    class="flex flex-row items-center py-2 px-3 gap-2 cursor-pointer hover:bg-blue-50 hover:text-gray-700 text-gray-400"
                    ><i
                      class="w-[24px] fa-solid fa-bookmark flex justify-center items-center"
                    /><span>Save</span></button
                  >
                  <button
                    class="flex flex-row items-center py-2 px-3 gap-2 cursor-pointer hover:bg-blue-50 hover:text-gray-700 text-gray-400"
                    ><i
                      class="w-[24px] fa-solid fa-pen flex justify-center items-center"
                    /><span>Edit</span></button
                  >
                  <button
                    class="flex flex-row items-center py-2 px-3 gap-2 cursor-pointer hover:bg-blue-50 hover:text-gray-700 text-gray-400"
                    ><i
                      class="w-[24px] fa-solid fa-delete-left flex justify-center items-center"
                    /><span>Edit</span></button
                  >
                </div>
              {/if}
            </div>

            <span class="divider-vertical h-5 mx-0 border-gray-300" />
            <button
              class="text-sm font-semibold text-gray-500 px-2 p-1 hover:bg-gray-200 rounded"
            >
              <i class="fa-solid fa-ban" />
              <span>Remove</span>
            </button>
            <button
              class="text-sm font-semibold text-gray-500 px-2 p-1 hover:bg-gray-200 rounded"
            >
              <i class="fa-solid fa-triangle-exclamation" />
              <span>Spam</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
