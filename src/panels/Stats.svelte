<script lang="ts">
  import type { DerivedData } from "../data";

  export let data: DerivedData
</script>

<div class="wrapper">
  <div class="bb br">
    <div class="text-display">Maximum Health</div>
    {data.health}
  </div>
  <div class="bb br">
    <div class="text-display">Armor Class</div>
    {data.armorClass}
  </div>
  <div class="bb">
    <div class="text-display">Speed</div>
    {data.speed}
  </div>
  <div class="br">
    <div class="text-display">Initiative</div>
    {data.initiative}
  </div>
  <div class="br">
    <div class="text-display">Passive Perception</div>
    {data.passivePerception}
  </div>
  <div>
    <div class="text-display">Proficency Bonus</div>
    {data.proficiencyBonus}
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    > div {
      @apply p-2;
    }

    .br {
      border-right: 2px solid var(--border-color);
    }

    .bb {
      border-bottom: 2px solid var(--border-color);
    }
  }
</style>
