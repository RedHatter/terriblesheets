<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { DerivedData, ProficiencyChange } from "../data";
  import { ChangeType, ProficiencyType } from "../data";
  import { capitalize } from "../utils";
  const dispatch = createEventDispatcher();

  export let data: DerivedData;

  function onChange(
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
    key: string
  ) {
    const detail: ProficiencyChange = {
      type: ChangeType.proficiency,
      key: "savingThrows",
      subkey: key,
      value: e.currentTarget.checked
        ? ProficiencyType.Proficient
        : ProficiencyType.None
    };
    dispatch("change", detail);
  }
</script>

<div>
  <h2>Skills</h2>
  <ul>
    {#each Object.entries(data.savingThrows) as [key, value]}
      <li>
        <label>
          {capitalize(key)}
          {capitalize(value.ability).substring(0, 3)}
          <input
            type="checkbox"
            checked={value.proficient != ProficiencyType.None}
            on:change={e => onChange(e, key)}
          />
        </label>
      </li>
    {/each}
  </ul>
</div>
