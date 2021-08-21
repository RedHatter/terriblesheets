<script lang="ts">
  import { slide } from "svelte/transition";
  import ItemDialog from "../config/ItemDialog.svelte";
  import { status } from "../data";

  let isDialogOpen = false;
  let selected = null;
</script>

{#if isDialogOpen}
  <ItemDialog on:close={() => (isDialogOpen = false)} />
{/if}

<div>
  <div class="text-display">Inventory</div>
  {#each $status.inventory as item}
    <div on:click={() => (selected = selected == item ? null : item)}>
      {item.name}
    </div>
    {#if selected == item}
      <div transition:slide>{item.description}</div>
    {/if}
  {/each}
  <button on:click={() => (isDialogOpen = true)}>+</button>
</div>

<style>
  div {
    @apply p-2;
  }
</style>
