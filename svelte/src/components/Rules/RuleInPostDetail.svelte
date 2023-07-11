<div class="relative card p-3 border border-slate-300 rounded overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-[42px] bg-secondary-500">
    <div class="flex h-full mx-4 gap-2 flex-row items-center">
      <span class="text-white">
        <i class="fa-solid fa-gavel" />
      </span>
      <p class="text-md font-semibold text-white">Rules</p>
    </div>
  </div>
  <div class="mt-[42px]">
    <ol>
      {#each [' Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'Lorem, ipsum.', ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'] as rule, i}
        <li class="flex flex-row text-sm font-semibold border-b py-2">
          {`${i + 1}. `}{rule}
        </li>
      {/each}
    </ol>
  </div>
</div>
