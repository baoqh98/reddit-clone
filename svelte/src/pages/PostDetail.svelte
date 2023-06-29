<script>
  import { Avatar } from "@skeletonlabs/skeleton";
</script>

<section class="bg-zinc-800 h-full">
  <div class="container max-w-screen-xl bg-surface-500 h-full">
    <!-- HEAD -->
    <div class="bg-neutral-950 flex flex-row text-white">
      <div class="container max-w-5xl">
        <div class="flex flex-row justify-left w-full gap-4 py-3">
          <div class="flex gap-4 text-md items-center">
            <button><i class="fa-solid fa-caret-up" /></button>
            <span>0</span>
            <button><i class="fa-solid fa-caret-down" /></button>
          </div>
          <div class="flex items-center gap-2 w-[80%] mr-auto">
            <span><i class="fa-solid fa-bars" /></span>
            <h1 class="truncate">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, consequuntur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Officiis corporis laudantium in, earum aliquam
              neque, maiores assumenda veniam ipsa ipsum amet aliquid explicabo
              recusandae saepe! Aperiam obcaecati perspiciatis vitae ipsam.
            </h1>
          </div>
          <div class="">
            <button class="flex flex-row gap-2 items-center"
              ><i class="fa-solid fa-circle-xmark" />
              <span>close</span></button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- BODY -->
    <div class="container max-w-5xl py-6">
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <div class="card border border-slate-300 overflow-hidden">
            <div class="grid grid-cols-12 gap-1">
              <div class="col-span-1 p-2">
                <div class="flex flex-col gap-2 items-center leading-4">
                  <button
                    class="text-[28px] text-slate-400 hover:text-primary-500 hover:bg-slate-200 h-6 w-6"
                  >
                    <i
                      class="fa-solid fa-caret-up rounded-sm active:-translate-y-1 ease-in-out duration-75"
                    />
                  </button>
                  <div class="font-semibold text-sm">0</div>
                  <button
                    class="text-[28px] text-slate-400 hover:text-secondary-500 hover:bg-slate-200 h-6 w-6"
                  >
                    <i
                      class="fa-solid fa-caret-down rounded-sm active:translate-y-1 ease-in-out duration-75"
                    />
                  </button>
                </div>
              </div>
              <div class="col-span-11 px-2 py-3">
                <div class="flex flex-col gap-2">
                  <div class="flex flex-row items-center gap-2">
                    <div class="flex flex-row items-center gap-1">
                      <Avatar src="" width="w-6" rounded="rounded-full" />
                      <div class="text-xs font-semibold">r/topic</div>
                    </div>
                    <div class="h-4 border-[1px]" />
                    <div class="text-xs font-light text-gray-500">
                      Posted by u/author 5 hours ago
                    </div>
                  </div>
                  <h1 class="text-black font-semibold">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur, fugit!
                  </h1>
                  <p class="text-[16px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam ipsum expedita veritatis harum fuga eligendi,
                    accusantium odio est eos molestiae exercitationem architecto
                    veniam in animi doloribus quia vel! Placeat, quasi?
                  </p>
                </div>
                <div class="flex gap-1 mt-2">
                  <button
                    class="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm font-bold text-sm text-gray-500"
                  >
                    <i class="fa-solid fa-message" />
                    <div>15 Comments</div>
                  </button>
                  <button
                    class="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm font-bold text-sm text-gray-500"
                  >
                    <i class="fa-solid fa-share" />
                    <div>Share</div>
                  </button>
                  <button
                    class="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-sm font-bold text-sm text-gray-500"
                  >
                    <i class="fa-solid fa-bookmark" />
                    <div>Save</div>
                  </button>
                </div>
              </div>
            </div>
            <!-- CREATE COMMENT -->
            <div class="flex flex-col my-2 mx-16">
              <span class="text-sm"
                >Comment as <a href="/me" class="text-secondary-500">account</a
                ></span
              >
              <div class="flex flex-col w-full">
                <label class="label w-full">
                  <textarea
                    class="textarea resize-none focus:border-secondary-500 focus-within:border-secondary-500"
                    rows="4"
                    placeholder="What are your thoughts?"
                  />
                </label>
                <button
                  class="btn btn-sm variant-filled-secondary place-self-end"
                  >Comment</button
                >
              </div>
            </div>
            <!-- COMMENTS -->
            <div class="my-4 mx-3">
              <div class="flex flex-row gap-4 mb-4">
                <div class="relative w-8">
                  <Avatar
                    class="w-8"
                    src="https://styles.redditmedia.com/t5_2jwea9/styles/profileIcon_9l0887gthsr41.png?width=256&height=256&crop=256:256,smart&s=fa8e6574de07e4724b19dfed4779c45f819a6455"
                  />
                </div>
                <div class="relative">
                  <div class="flex flex-row gap-2">
                    <span class="text-xs font-semibold">userfirstthings</span>
                    <hr />
                    <span class="text-xs font-light text-gray-500"
                      >createAt 7 hr ago</span
                    >
                  </div>
                  <p class="text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam, nobis repellendus. Eius illo aliquam, ad voluptatem
                    nemo, officiis reiciendis quidem minima qui repellendus
                    cupiditate voluptates atque dolorum sed excepturi
                    asperiores!
                  </p>
                </div>
              </div>
              <div class="flex flex-row gap-4">
                <div class="relative w-8">
                  <Avatar
                    class="w-8"
                    src="https://styles.redditmedia.com/t5_2jwea9/styles/profileIcon_9l0887gthsr41.png?width=256&height=256&crop=256:256,smart&s=fa8e6574de07e4724b19dfed4779c45f819a6455"
                  />
                </div>
                <div class="relative">
                  <div class="flex flex-row gap-2">
                    <span class="text-xs font-semibold">userfirstthings</span>
                    <hr />
                    <span class="text-xs font-light text-gray-500"
                      >createAt 7 hr ago</span
                    >
                  </div>
                  <p class="text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam, nobis repellendus. Eius illo aliquam, ad voluptatem
                    nemo, officiis reiciendis quidem minima qui repellendus
                    cupiditate voluptates atque dolorum sed excepturi
                    asperiores!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="card p-4">card right</div>
        </div>
      </div>
    </div>
  </div>
</section>
