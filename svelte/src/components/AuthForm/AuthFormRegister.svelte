<script>
  import { Toast, toastStore } from "@skeletonlabs/skeleton";
  import { url_api } from "../../utils/global/url";
  import axios from "axios";

  const registerEndpoint = `${url_api}/auth/register`;

  let username = "username";
  let email = "test@email.com";
  let password = "password123";
  let passwordConfirm = "password123";

  let toastSetting = {
    message: "Something wrong!",
    background: "variant-filled-error",
    classes: "text-white",
  };

  async function register() {
    try {
      const registerForm = {
        username,
        email,
        password,
        passwordConfirm,
      };

      await axios.post(registerEndpoint, registerForm);

      toastSetting.message = `Register successfully!`;
      toastSetting.background = "variant-filled-success";
      toastStore.trigger(toastSetting);
    } catch (error) {
      toastSetting.message = error.response.data.message;
      toastStore.trigger(toastSetting);
    }
  }

  export let authFormType;
</script>

<Toast class="text-white" />

<div class="container max-w-sm py-6">
  <div class="flex flex-col mt-[120px]">
    <div
      class="card p-4 rounded-lg border border-slate-300 hover:border-slate-400 shadow-lg"
    >
      <div />
      <h1 class="text-xl font-bold my-4 text-center">
        {#if authFormType == "register"}
          Sign up your account
        {:else if authFormType === "login"}
          Login your account
        {/if}
      </h1>
      <form on:submit|preventDefault={register} class="flex flex-col gap-3">
        <div class="w-full">
          <label class="label">
            <input
              class="input focus:border-secondary-500 focus-within:border-secondary-500"
              type="text"
              id="username"
              placeholder="username"
              bind:value={username}
            />
          </label>
        </div>

        {#if authFormType === "register"}
          <div class="w-full">
            <label class="label">
              <input
                class="input focus:border-secondary-500 focus-within:border-secondary-500"
                type="text"
                id="email"
                placeholder="email"
                bind:value={email}
              />
            </label>
          </div>
        {/if}

        <div class="w-full">
          <label class="label">
            <input
              class="input focus:border-secondary-500 focus-within:border-secondary-500"
              type="password"
              id="password"
              placeholder="password"
              bind:value={password}
            />
          </label>
        </div>

        {#if authFormType === "register"}
          <div class="w-full">
            <label class="label">
              <input
                class="input focus:border-secondary-500 focus-within:border-secondary-500"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                bind:value={passwordConfirm}
              />
            </label>
          </div>
        {/if}

        <div class="flex justify-end">
          <button
            type="submit"
            class="btn variant-filled-secondary rounded-full font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          >
            {#if authFormType === "register"}
              Register
            {:else}
              Login
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
