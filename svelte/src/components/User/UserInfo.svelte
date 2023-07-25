<script>
  import { Avatar } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';

  export let userFromParams;
  export let postNumber;
  const { username, age, dateOfBirth } = userFromParams;
</script>

<div class="relative card p-3 border border-slate-300 rounded overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-[94px] bg-blue-400" />
  <div class="flex flex-col gap-3">
    <Avatar
      width={'w-32'}
      class="relative w-32 mt-4 left-[50%] translate-x-[-50%]"
    />
    <div class="flex flex-col justify-center">
      <span class="text-[24px] font-semibold text-center">{username}</span>
      <span class="text-sm font-extralight text-gray-500 text-center"
        >u/{username}</span
      >
    </div>
    <button
      class="btn btn-sm bg-gradient-to-r from-red-700 via-primary-500 to-error-500 text-white font-medium"
      >Buy a thing</button
    >
    <div class="flex flex-row mb-2">
      <div class="flex flex-col flex-1">
        <span class="text-md font-semibold">Post</span>
        <span class="text-sm"
          ><i class="fa-solid fa-clipboard text-blue-500" />
          <span class="ml-1 text-gray-500 font-normal">{postNumber}</span>
        </span>
      </div>
      <div class="flex flex-col flex-1">
        <span class="text-md font-semibold">{age}</span>
        <span class="text-sm"
          ><i class="fa-solid fa-cake-candles text-blue-500" />
          <span class="ml-1 text-gray-500 font-normal">{dateOfBirth}</span>
        </span>
      </div>
    </div>
    <button
      on:click={() => goto('/submit')}
      class="btn btn-sm bg-gradient-to-r from-blue-700 via-secondary-500 to-blue-400 text-white font-medium"
      >New Post</button
    >
  </div>
</div>
