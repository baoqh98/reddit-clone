<script>
  import { Toast } from '@skeletonlabs/skeleton';
  import { url_api } from '../../utils/global/url';
  import axios from 'axios';
  import { handleToastSetting } from '../../utils/DOM/handleToastSetting';

  const registerEndpoint = `${url_api}/auth/register`;
  const loginEndpoint = `${url_api}/auth/login`;

  let username = '';
  let email = '';
  let password = '';
  let passwordConfirm = '';

  async function register() {
    try {
      const registerForm = {
        username,
        email,
        password,
        passwordConfirm,
      };

      await axios.post(registerEndpoint, registerForm);
      handleToastSetting(`Register successfully!`, 'variant-filled-success');
    } catch (error) {
      handleToastSetting(error.response.data.message);
    }
  }

  async function login() {
    try {
      const loginForm = {
        username,
        password,
      };

      const res = (await axios.post(loginEndpoint, loginForm)).data;
      document.cookie = 'jwt' + '=' + 'Bearer ' + res.data.accessToken;
      document.cookie =
        'jwt_refreshToken' + '=' + 'Bearer ' + res.data.userRefreshToken;

      handleToastSetting(`Loggin successfully!`, 'variant-filled-success');
    } catch (error) {
      handleToastSetting(error.response.data.message);
    }
  }

  export let authFormType;
</script>

<Toast />

<div class="container max-w-sm py-6">
  <div class="flex flex-col mt-[120px]">
    <div
      class="card p-4 rounded-lg border border-slate-300 hover:border-slate-400 shadow-lg"
    >
      <div />
      <h1 class="text-xl font-bold my-4 text-center">
        {#if authFormType == 'register'}
          Sign up your account
        {:else if authFormType === 'login'}
          Login your account
        {/if}
      </h1>
      <form
        on:submit|preventDefault={authFormType === 'register'
          ? register
          : login}
        class="flex flex-col gap-3"
      >
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

        {#if authFormType === 'register'}
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

        {#if authFormType === 'register'}
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
            {#if authFormType === 'register'}
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
