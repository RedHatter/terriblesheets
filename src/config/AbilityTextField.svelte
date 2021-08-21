<script lang="ts">
  import type { AbilityChange, AbilityScores } from "../data";
  import { ChangeType } from "../data";
  import { createEventDispatcher } from "svelte";
  import TextField from "./TextField.svelte";
  const dispatch = createEventDispatcher();

  export let label: string;
  export let subkey: keyof AbilityScores;
  export let value: number;

  function onChange(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const detail: AbilityChange = {
      type: ChangeType.ability,
      key: "abilityScores",
      subkey,
      value: parseInt(e.currentTarget.value) - value
    };
    dispatch("change", detail);
  }
</script>

<TextField {label} {value} on:change={onChange} />
