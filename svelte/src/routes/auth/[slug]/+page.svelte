<script>
  import AuthForm from '../../../components/AuthForm/AuthForm.svelte';
  export let data;

  $: slug = data.slug;
  $: isAuthenticated = data.user.isAuthenticated;
</script>

<div>
  <AuthForm authFormType={slug} {isAuthenticated} />
</div>
