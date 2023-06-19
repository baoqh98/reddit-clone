<script>
  import { Avatar } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";

  const navigate = (dir) => {
    goto(dir);
  };
</script>

<div
  class="flex flex-row items-center bg-white p-2 gap-2 border border-slate-300 hover:border-slate-400 rounded"
>
  <a href="/user/me">
    <Avatar class="cursor-pointer" width="w-11" />
  </a>
  <div class="w-full">
    <label class="label">
      <input
        on:click={() => navigate("/submit")}
        class="input rounded-md transition-none bg-gray-100 hover:bg-white hover:border-primary-500 w-full"
        type="text"
        placeholder="Create Post"
      />
    </label>
  </div>
  <div class="flex flex-row">
    <button
      class="h-10 w-10 rounded text-[18px] text-gray-500 hover:bg-gray-100 cursor-pointer"
      on:click={() => navigate("/submit")}
      ><i class="fa-regular fa-image" /></button
    >
    <button
      class="h-10 w-10 rounded text-[18px] text-gray-500 hover:bg-gray-100 cursor-pointer"
      on:click={() => navigate("/submit")}
      ><i class="fa-solid fa-paperclip" /></button
    >
  </div>
</div>
