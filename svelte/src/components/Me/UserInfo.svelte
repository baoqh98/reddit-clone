<script>
  import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="relative card p-3 border border-slate-300 rounded overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-[94px] bg-blue-400" />
  <div class="flex flex-col gap-3">
    <Avatar
      width={'w-32'}
      class="relative w-32 mt-4 left-[50%] translate-x-[-50%]"
    />
    <div class="flex flex-col justify-center">
      <span class="text-[24px] font-semibold text-center">username</span>
      <span class="text-sm font-extralight text-gray-500 text-center"
        >u/username</span
      >
    </div>
    <button
      class="btn btn-sm bg-gradient-to-r from-red-700 via-primary-500 to-error-500 text-white font-medium"
      >Buy a thing</button
    >
    <button
      class="btn btn-sm bg-gradient-to-r from-blue-700 via-secondary-500 to-blue-400 text-white font-medium"
      >New Post</button
    >
  </div>
</div>
