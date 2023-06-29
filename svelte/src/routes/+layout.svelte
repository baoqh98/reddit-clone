<script>
  // custom Skeleton theme:
  import { page } from "$app/stores";
  import "../theme.postcss";
  // This contains the bulk of Skeletons required styles:
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  // application's global stylesheet
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton";
  import Header from "../components/Header/Header.svelte";
  // import Error from "../pages/Error.svelte";
  import { goto } from "$app/navigation";

  function isPageError(statusCode) {
    const firstDigit = Math.floor(statusCode / 100);
    return firstDigit === 4 || firstDigit === 5;
  }
</script>

{#if !isPageError($page.status)}
  <AppShell>
    <svelte:fragment slot="header">
      <Header />
    </svelte:fragment>
    <slot />
  </AppShell>
{/if}
