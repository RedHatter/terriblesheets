<script lang="ts">
  import type { DerivedData } from "../data";
  import { capitalize } from "../utils";
  import Paper from "./Paper.svelte";

  export let data: DerivedData;
</script>

<div class="wrapper">
  <span class="text-display">Attributes</span>
  {#each Object.entries(data.abilityScores) as [ability, values]}
    <div class="ability">
      <span class="text-display">{capitalize(ability)}</span>
      <span>{values.modifier}</span>
      <span>{values.base}</span>
    </div>
  {/each}
</div>

<style lang="postcss">
  .wrapper {
    @apply p-2;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: var(--s-1);

    > span:first-child {
      grid-column: span 6;
    }
  }

  .ability {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    border: 2px solid var(--border-color);

    span:first-child,
    span:nth-child(2) {
      border-bottom: 2px solid var(--border-color);
    }

    span:nth-child(2) {
      font-size: 3rem;
      line-height: 2;
    }
  }
</style>
