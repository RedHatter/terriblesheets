<script lang="ts">
  import type { DerivedData } from '../data'
import { capitalize } from '../utils';

  export let data: DerivedData
</script>

<div>
  <span class="text-display">Skills</span>
  <ul>
    {#each Object.entries(data.skills) as [skill, value]}
      <li>
        <span>{value.modifier}</span>
        {capitalize(skill)}
        ({capitalize(value.ability.substring(0, 3))})
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
    grid-template-rows: repeat(6, auto);
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
