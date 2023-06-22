<script>
  let username = "";
  let email = "";
  let password = "";
  let passwordConfirm = "";

  function register() {
    console.log("Registering user:", { username, email, password });
  }

  export let formType;
</script>

<div
  class="card p-4 rounded-lg border border-slate-300 hover:border-slate-400 shadow-lg"
>
  <div />
  <h1 class="text-xl font-bold my-4 text-center">Sign up your account</h1>
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

    <div class="w-full">
      <label class="label">
        <input
          class="input focus:border-secondary-500 focus-within:border-secondary-500"
          type="text"
          id="username"
          placeholder="email"
          bind:value={email}
        />
      </label>
    </div>

    <div class="w-full">
      <label class="label">
        <input
          class="input focus:border-secondary-500 focus-within:border-secondary-500"
          type="password"
          id="username"
          placeholder="password"
          bind:value={password}
        />
      </label>
    </div>

    <div class="w-full">
      <label class="label">
        <input
          class="input focus:border-secondary-500 focus-within:border-secondary-500"
          type="password"
          id="username"
          placeholder="Confirm Password"
          bind:value={passwordConfirm}
        />
      </label>
    </div>

    <div class="flex justify-end">
      <button
        type="submit"
        class="btn variant-filled-secondary rounded-full font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        >Register</button
      >
    </div>
  </form>
</div>
