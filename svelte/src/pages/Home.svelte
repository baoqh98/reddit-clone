<script>
  import Post from "../components/Post/Post.svelte";
  import CreatePost from "../components/Post/CreatePost.svelte";
</script>

<div class="container max-w-screen-lg py-6">
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-2">
      <div class="flex flex-col">
        <div class="mb-4">
          <CreatePost />
        </div>
        <div class="flex flex-col gap-3">
          <Post />
        </div>
      </div>
    </div>
    <div>
      <div class="card p-4">card right</div>
    </div>
  </div>
</div>
