<script lang="ts">
  import { slide } from "svelte/transition";

  export let title;
  export let subtitle = undefined;
  export let content;
  export let expanded = false;
</script>

<div>
  <span on:click={e => (expanded = !expanded)} class="text-display"
    >{title}</span
  >
  {#if expanded}
    <div transition:slide>
      {content}
    </div>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  span {
    cursor: pointer;
  }
</style>
