<script lang="ts">
  import type { DerivedData } from "../data";
  import AbilityTextField from "./AbilityTextField.svelte";

  export let data: DerivedData;
</script>

<h1>Ability Scores</h1>
<div>
  <AbilityTextField
    label="Strength"
    subkey="strength"
    value={data.abilityScores.strength.base}
    on:change
  />
  <AbilityTextField
    label="Dexterity"
    subkey="dexterity"
    value={data.abilityScores.dexterity.base}
    on:change
  />
  <AbilityTextField
    label="Constitution"
    subkey="constitution"
    value={data.abilityScores.constitution.base}
    on:change
  />
  <AbilityTextField
    label="Intelligence"
    subkey="intelligence"
    value={data.abilityScores.intelligence.base}
    on:change
  />
  <AbilityTextField
    label="Wisdom"
    subkey="wisdom"
    value={data.abilityScores.wisdom.base}
    on:change
  />
  <AbilityTextField
    label="Charisma"
    subkey="charisma"
    value={data.abilityScores.charisma.base}
    on:change
  />
</div>

<style lang="postcss">
  div {
    display: grid;
    grid-template-columns: auto auto auto;
  }
</style>
