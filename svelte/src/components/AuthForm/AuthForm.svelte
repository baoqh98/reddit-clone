<script>
  import { Toast } from '@skeletonlabs/skeleton';
  import { apiEndpoint } from '../../utils/global/apiEndpoint';
  import axios from 'axios';
  import { handleToastSetting } from '../../utils/DOM/handleToastSetting';
  import { beforeUpdate } from 'svelte';

  export let isAuthenticated;
  export let authFormType;

  beforeUpdate(() => {
    if (isAuthenticated) {
      location.href = '/';
    }
  });

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
      await axios.post(apiEndpoint.registerEndpoint, registerForm, {
        withCredentials: true,
        credentials: 'include',
      });
      handleToastSetting(
        `Register successfully!`,
        'variant-filled-success',
        undefined,
        (response) => {
          if (response.status === 'closed') {
            window.location = '/auth/login';
          }
        },
        1000
      );
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

      await axios.post(apiEndpoint.loginEndpoint, loginForm, {
        withCredentials: true,
        credentials: 'include',
      });

      handleToastSetting(
        `Login successfully!`,
        'variant-filled-success',
        undefined,
        (response) => {
          if (response.status === 'closed') {
            window.location = '/';
          }
        },
        1000
      );
    } catch (error) {
      handleToastSetting(error.response.data.message);
    }
  }
</script>

{#if !isAuthenticated}
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
{/if}
