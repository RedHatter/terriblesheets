<script lang="ts">
  import Config from "./config/Config.svelte";
  import AbilityScores from "./panels/AbilityScores.svelte";
  import { data } from "./data";
  import Features from "./panels/Features.svelte";
  import SavingThrows from "./panels/SavingThrows.svelte";
  import Skills from "./panels/Skills.svelte";
  import Stats from "./panels/Stats.svelte";
  import Panel from "./panels/Panel.svelte";
  import Bio from "./panels/Bio.svelte";
  import Inventory from "./panels/Inventory.svelte";

  let showConfig = false;

  let layout = {
    type: "column",
    children: [
      Bio,
      AbilityScores,
      { type: "row", children: [Stats, SavingThrows] },
      Skills,
      { type: "row", children: [Inventory, Features] }
    ]
  };
</script>

<main>
  {#if showConfig}
    <Config on:close={() => (showConfig = false)} />
  {:else}
    <button on:click={() => (showConfig = true)}>Modify</button>
    <div>
      <Panel children={layout.children} data={$data} type={layout.type} />
    </div>
  {/if}
</main>

<style lang="postcss">
  :root {
    @for $i from 1 to 6 {
      --s-$(i): calc(0.25rem * $i);
    }

    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;

    --border-color: black;
  }

  @each $s in xs, sm, base, lg, xl, 2xl {
    @mixin text-$(s) {
      font-size: var(--text-$(s));
    }
  }

  @for $i from 1 to 6 {
    @mixin p-$(i) {
      padding: var(--s-$(i));
    }

    @mixin pt-$(i) {
      padding-top: var(--s-$(i));
    }

    @mixin pr-$(i) {
      padding-right: var(--s-$(i));
    }

    @mixin pb-$(i) {
      padding-bottom: var(--s-$(i));
    }

    @mixin pl-$(i) {
      padding-left: var(--s-$(i));
    }

    @mixin m-$(i) {
      margin: var(--s-$(i));
    }

    @mixin mt-$(i) {
      margin-top: var(--s-$(i));
    }

    @mixin mr-$(i) {
      margin-right: var(--s-$(i));
    }

    @mixin mb-$(i) {
      margin-bottom: var(--s-$(i));
    }

    @mixin ml-$(i) {
      margin-left: var(--s-$(i));
    }

    @mixin px-$(i) {
      padding-left: var(--s-$(i));
      padding-right: var(--s-$(i));
    }

    @mixin py-$(i) {
      padding-top: var(--s-$(i));
      padding-bottom: var(--s-$(i));
    }

    @mixin mx-$(i) {
      margin-left: var(--s-$(i));
      margin-right: var(--s-$(i));
    }

    @mixin my-$(i) {
      margin-top: var(--s-$(i));
      margin-bottom: var(--s-$(i));
    }
  }

  main {
    max-width: 1024px;
    padding: 1em;
    margin: 0 auto;
    line-height: 1.5;
  }

  :global(body) {
    background-color: rgb(245, 245, 245);
  }

  div {
    border: 2px solid var(--border-color);
  }
</style>
