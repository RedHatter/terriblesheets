<script lang="ts">
  import type { DerivedData } from "../data";

  export let data: DerivedData
</script>

<div class="wrapper">
  <div>
    <div class="text-display">Name</div>
    {data.name}
  </div>
  <div>
    <div class="text-display">Class & Level</div>
    {data.class}
    {data.level}
  </div>
  <div>
    <div class="text-display">Background</div>
    {data.background}
  </div>
  <div>
    <div class="text-display">Race</div>
    {data.race}
  </div>
  <div>
    <div class="text-display">Alignment</div>
    {data.alignment}
  </div>
  <div>
    <div class="text-display">Experience Points</div>
    {data.exp}
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;

    > div:last-child {
      border-right: none;
    }

    > div {
      @apply p-2;
      border-right: 2px solid var(--border-color);
    }
  }
</style>
