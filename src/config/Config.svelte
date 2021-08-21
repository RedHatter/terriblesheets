<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Change } from "../data";
    import { commits, data } from "../data";
    import Dialog from "../Dialog.svelte";
    import AbilityScores from "./AbilityScores.svelte";
    import Features from "./Features.svelte";
import SavingThrows from "./SavingThrows.svelte";
import Skills from "./Skills.svelte";
import Stats from "./Stats.svelte";
    import Tabs from "./Tabs.svelte";
    import TextField from "./TextField.svelte";
    const dispatch = createEventDispatcher();
  
    let changes: ReadonlyArray<Change> = [];
    let origin = "";
  
    function onChange(e: CustomEvent<Change>) {
      changes = [
        ...changes.filter(
          (o) => o.key != e.detail.key || o.type != e.detail.type
        ),
        e.detail,
      ];
    }
  
    function done() {
      commits.update((o) => [...o, { origin, changes }]);
      close();
    }
  
    function close() {
      dispatch("close");
    }
  
    $: console.log(changes);
</script>

<Stats data={$data} on:change={onChange} />
<AbilityScores data={$data} on:change={onChange} />
<h1>Proficiencies</h1>
<div>
  <SavingThrows data={$data} />
  <Skills data={$data} />
</div>
<Features on:change={onChange} />
<TextField
  label="Describe Changes"
  bind:value={origin}
  placeholder="Barbarian level 3"
/>
<button on:click={done}>Done</button>
<button on:click={close}>Cancel</button>

<style>
  div {
    display: flex;
    justify-content: space-around;
  }
</style>
