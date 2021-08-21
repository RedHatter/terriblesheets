<script lang="ts">
  import type { DerivedData } from '../data'
import { capitalize } from '../utils';

  export let data: DerivedData
</script>

<div>
  <span class="text-display">Saving Throws</span>
  <ul>
    {#each Object.entries(data.savingThrows) as [skill, value]}
      <li>
        <span>{value.modifier}</span>
        {capitalize(skill)}
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  div {
    @apply p-4;
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, auto);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    @apply m-1;

    span {
      @apply mr-2, text-lg;
    }
  }
</style>
