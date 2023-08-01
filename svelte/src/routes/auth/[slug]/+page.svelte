<script>
  import AuthForm from '../../../components/AuthForm/AuthForm.svelte';
  export let data;

  $: authFormType = data.authFormType;
  $: isAuthenticated = data.user.isAuthenticated;
</script>

<div>
  {#if authFormType}
    <AuthForm {authFormType} {isAuthenticated} />
  {:else if data.logout}
    <div>Logout ...</div>
  {/if}
</div>
