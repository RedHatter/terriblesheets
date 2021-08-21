<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  let dispatch = createEventDispatcher()

  export let tabs: ReadonlyArray<string>
  export let showAdd = false

  let selected = 0
</script>

<div>
  <ul>
    {#each tabs as tab, i}
      <li class:selected={selected === i} on:click={() => (selected = i)}>
        {tab}
      </li>
    {/each}
    {#if showAdd}
      <li on:click={() => (selected = -1)}>+</li>
    {/if}
  </ul>
  <slot index={selected} />
</div>

<style>
  div {
    display: flex;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 1rem 1.25rem;
    cursor: pointer;
  }

  li:hover {
    background-color: lightgray;
  }
</style>
