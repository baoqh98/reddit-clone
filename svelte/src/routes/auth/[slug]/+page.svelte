<script>
  export let data;
  import AuthForm from '../../../components/AuthForm/AuthForm.svelte';

  $: slug = data.slug;
  $: isAuthenticated = data.user.isAuthenticated;
</script>

<div>
  <AuthForm authFormType={slug} {isAuthenticated} />
</div>
