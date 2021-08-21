<script lang="ts">
import type { DerivedData } from "../data";

  import Accordion from "./Accordion.svelte";

  export let data: DerivedData
</script>

<div>
  <span class="text-display">Features & Traits</span>
  {#each data.features as feature}
    <Accordion title={feature.name} content={feature.description} />
  {/each}
</div>

<style>
  div {
    @apply p-4;
  }
</style>
