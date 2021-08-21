<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import type { DerivedData } from "../data";

  export let children: ReadonlyArray<any>;
  export let data: DerivedData
  export let type: 'row' | 'column'
</script>

<div class={type}>
  {#each children as panel}
    {#if panel.children != undefined}
      <svelte:self children={panel.children} {data} type={panel.type} />
    {:else}
      <svelte:component this={panel} {data} />
    {/if}
  {/each}
</div>

<style lang="postcss">
  div.row {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;

    :global(> :last-child) {
      border-right: none;
    }

    :global(> *) {
      border-right: 2px solid var(--border-color);
    }
  }

  div.column {
    :global(> :last-child) {
      border-bottom: none;
    }

    :global(> *) {
      border-bottom: 2px solid var(--border-color);
    }
  }
</style>
