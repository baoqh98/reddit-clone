<div class="relative card p-3 border border-slate-300 rounded overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-[42px] bg-secondary-500">
    <div class="flex h-full mx-4 gap-2 flex-row items-center">
      <span class="text-white">
        <i class="fa-solid fa-user-plus" />
      </span>
      <p class="text-md font-semibold text-white">User to follow</p>
    </div>
  </div>
  <div class="mt-[42px]">
    <ul>
      {#each ['Lorem, ipsum.', 'Lorem, ipsum.', 'Lorem, ipsum.'] as user}
        <li
          class="flex flex-row items-center justify-between text-xs text-secondary-500"
        >
          <span class="cursor-default">
            u/{user}
          </span>
          <button class="btn btn-sm">
            <i class="fa-solid fa-plus" />
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>
