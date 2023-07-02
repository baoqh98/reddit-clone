<script>
  export let data;
  import AuthForm from "../../../components/AuthForm/AuthForm.svelte";

  $: slug = data.slug;
</script>

<div>
  <AuthForm authFormType={slug} />
</div>
