<script>
  /** @type {import('./$types').PageData} */
  import MyPostList from '../../../components/User/MyPostList.svelte';
  import UserInfo from '../../../components/User/UserInfo.svelte';

  export let data;
  const { postByUser, userFromParams } = data;
</script>

<section>
  <div class="container max-w-5xl py-6">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <MyPostList {postByUser} />
      </div>
      <div class="col-span-1">
        <UserInfo {userFromParams} postNumber={postByUser.length} />
      </div>
    </div>
  </div>
</section>
