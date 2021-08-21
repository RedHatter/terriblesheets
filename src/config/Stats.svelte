<script lang="ts">
  import type { ChangeEvent } from "../utils";
  import type { NumericChange, TextChange, DerivedData } from "../data";
  import { ChangeType } from "../data";
  import { createEventDispatcher } from "svelte";
  import TextField from "./TextField.svelte";
  const dispatch = createEventDispatcher();

  export let data: DerivedData;

  let {
    name, class: playerClass, level, background, race, alignment, exp, speed, health
  } = data

  function onNumericChange(key: 'health' | 'level' | 'exp' | 'speed', e: ChangeEvent) {
    const detail: NumericChange = {
      type: ChangeType.numeric,
      key: key,
      value: parseInt(e.currentTarget.value) - health
    };
    dispatch("change", detail);
  }

  function onTextChange(key: 'name' | 'class' | 'background' | 'race' | 'alignment', e: ChangeEvent) {
    const detail: TextChange = {
      type: ChangeType.text,
      key: key,
      value: e.currentTarget.value
    };
    dispatch("change", detail);
  }
</script>

<h1>Stats</h1>
<div>
  <TextField
    label="Name"
    value={playerClass}
    on:change={onTextChange.bind(null, "name")}
  />
  <span />
  <TextField
    label="Class"
    value={playerClass}
    on:change={onTextChange.bind(null, "class")}
  />
  <TextField
    label="Level"
    value={level}
    on:change={onNumericChange.bind(null, "level")}
  />
  <TextField
    label="Background"
    value={background}
    on:change={onTextChange.bind(null, "background")}
  />
  <TextField
    label="Race"
    value={race}
    on:change={onTextChange.bind(null, "race")}
  />
  <TextField
    label="Alignment"
    value={alignment}
    on:change={onTextChange.bind(null, "alignment")}
  />
  <TextField
    label="Experience Points"
    value={exp}
    on:change={onNumericChange.bind(null, "exp")}
  />
  <TextField
    label="Speed"
    value={speed}
    on:change={onNumericChange.bind(null, "speed")}
  />
  <TextField
    label="Max Health"
    value={health}
    on:change={onNumericChange.bind(null, "health")}
  />
</div>

<style>
  div {
    display: grid;
    grid-template-columns: auto auto;
  }
</style>
