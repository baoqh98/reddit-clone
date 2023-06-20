<script>
  import { FileDropzone } from "@skeletonlabs/skeleton";

  let nsfw = false;
  function toggleNsfw() {
    nsfw = !nsfw;
  }
  function handleOnkeyDownSpan(event) {
    if (event.key === "Enter") {
      toggleNsfw();
    }
  }
</script>

<div class="flex flex-col my-4 gap-4">
  <div class="flex flex-col">
    <div class="flex flex-row justify-between items-center mb-2">
      <h1 class="text-lg font-semibold text-[20px]">Create a Post</h1>
      <button
        class="px-4 py-2 hover:bg-gray-300 rounded-full font-bold text-secondary-500 active:bg-gray-400"
        >Drafts
        <span
          class="px-1 bg-gray-400 text-sm text-gray-100 font-semibold rounded-sm"
          >0</span
        >
      </button>
    </div>
    <hr />
  </div>

  <div class="w-[50%]">
    <label class="label">
      <select
        class="select focus:border-secondary-500 focus-within:border-secondary-500"
        placeholder="choose a topic"
      >
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </label>
  </div>

  <div class="card border border-slate-300 p-3 flex flex-col gap-4">
    <label class="label">
      <input
        class="input rounded focus:border-secondary-500 focus-within:border-secondary-500"
        type="text"
        placeholder="Title"
      />
    </label>
    <label class="label">
      <textarea
        class="textarea focus:border-secondary-500 focus-within:border-secondary-500"
        rows="4"
        placeholder="Content"
      />
    </label>

    <FileDropzone name="import_media" class="active:border-secondary-500">
      <svelte:fragment slot="lead"
        ><i class="fa-solid fa-photo-film text-[24px]" /></svelte:fragment
      >

      <svelte:fragment slot="message"
        >Drag and or click to import image</svelte:fragment
      >
      <svelte:fragment slot="meta">PNG, JPEG and GIF allowed</svelte:fragment>
    </FileDropzone>

    <div class="flex justify-end">
      <span
        on:click={toggleNsfw}
        on:keydown={handleOnkeyDownSpan}
        class={nsfw
          ? "chip variant-filled-secondary"
          : "chip bg-slate-200  hover:bg-slate-400"}
      >
        <span><i class="fa-solid fa-check" /></span>
        <span>not safe for work</span>
      </span>
    </div>

    <hr />

    <div class="flex justify-end">
      <button class="btn variant-filled-primary">Post</button>
    </div>
  </div>
</div>
