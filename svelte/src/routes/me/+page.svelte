<script>
  import MyPost from '../../components/Me/MyPost.svelte';
  import UserInfo from '../../components/Me/UserInfo.svelte';

  export let data;
  const { user } = data;

  let header = [
    'OVERVIEW',
    'POSTS',
    'COMMENTS',
    'HISTORY',
    'SAVED',
    'HIDDEN',
    'UPVOTED',
    'DOWNVOTED',
    "AWARDS RECEI'VED",
    'AWARDS GIVEN',
  ];
</script>

<section>
  <div class="bg-white py-3">
    <div class="container max-w-screen-lg">
      <ul class="flex justify-between">
        {#each header as title}
          <li>
            <a href={`/me`}>
              <span class="text-[14px] font-normal hover:text-secondary-500"
                >{title}</span
              >
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="container max-w-5xl py-6">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <MyPost />
      </div>
      <div class="col-span-1">
        <UserInfo {user} />
      </div>
    </div>
  </div>
</section>
