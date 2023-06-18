<script>
  // custom Skeleton theme:
  import "../theme.postcss";
  // This contains the bulk of Skeletons required styles:
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  // application's global stylesheet
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton";
  import Header from "../components/Header/Header.svelte";
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <slot />
</AppShell>
