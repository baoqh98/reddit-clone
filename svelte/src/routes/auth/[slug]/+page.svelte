<script>
  export let data;
  import AuthFormLogin from "../../../components/AuthForm/AuthFormLogin.svelte";
  import AuthFormRegister from "../../../components/AuthForm/AuthFormRegister.svelte";

  import { page } from "$app/stores";
  import { onMount } from "svelte";
  console.log($page);

  onMount(() => {
    console.log($page);
  });

  $: slug = data.slug;
</script>

<div>
  <AuthFormRegister authFormType={slug} />
  <!-- {#if slug === "register"}{:else if slug === "login"}
    <AuthFormLogin />
  {/if} -->
</div>
