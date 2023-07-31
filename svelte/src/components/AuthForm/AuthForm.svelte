<script>
  import { enhance } from '$app/forms';
  import { Toast } from '@skeletonlabs/skeleton';

  import { handleToastSetting } from '../../utils/DOM/handleToastSetting';

  export let isAuthenticated;
  export let authFormType;

  let username = `username${Math.random().toFixed(2) * 100}`;
  let email = `${username}@email.com`;
  let password = 'password123';
  let passwordConfirm = 'password123';

  function enhancer() {
    return async ({ result }) => {
      if (result.type === 'success') {
        handleToastSetting(
          result.data.message,
          'variant-filled-success',
          undefined,
          (response) => {
            if (response.status === 'closed' && !result.data.register) {
              window.location = '/';
            } else if (response.status === 'closed' && result.data.register) {
              window.location = '/auth/login';
            }
          },
          3000
        );
      } else if (result.type === 'error') {
        result.error.messages.forEach((message) => {
          handleToastSetting(
            message,
            'variant-filled-error',
            undefined,
            undefined,
            4000
          );
        });
      } else {
        handleToastSetting(
          'Something Wrong!',
          'variant-filled-error',
          undefined,
          undefined,
          2000
        );
      }
    };
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
          class="flex flex-col gap-3"
          method="POST"
          action={authFormType === 'register' ? '?/register' : '?/login'}
          use:enhance={enhancer}
        >
          <div class="w-full">
            <label class="label">
              <input
                class="input focus:border-secondary-500 focus-within:border-secondary-500"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
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
                  name="email"
                  placeholder="Email"
                  bind:value={email}
                />
              </label>
            </div>
          {/if}

          <div class="w-full">
            <label class="label">
              <input
                name="password"
                class="input focus:border-secondary-500 focus-within:border-secondary-500"
                type="password"
                id="password"
                placeholder="Password"
                bind:value={password}
              />
            </label>
          </div>

          {#if authFormType === 'register'}
            <div class="w-full">
              <label class="label">
                <input
                  name="passwordConfirm"
                  class="input focus:border-secondary-500 focus-within:border-secondary-500"
                  type="password"
                  id="passwordConfirm"
                  placeholder="passwordConfirm"
                  bind:value={passwordConfirm}
                />
              </label>
            </div>
          {/if}

          <div class="flex justify-end">
            <button
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
