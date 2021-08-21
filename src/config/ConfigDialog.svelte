<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Change } from "../data";
  import { commits, data } from "../data";
  import Dialog from "../Dialog.svelte";
  import AbilityScores from "./AbilityScores.svelte";
  import Features from "./Features.svelte";
  import Tabs from "./Tabs.svelte";
  import TextField from "./TextField.svelte";
  const dispatch = createEventDispatcher();

  let changes: ReadonlyArray<Change> = [];
  let origin = "";

  const tabContent = [AbilityScores, Features];

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

<Dialog on:close>
  <Tabs tabs={["Ability Scores", "Features"]} let:index>
    <div>
      <svelte:component
        this={tabContent[index]}
        data={$data}
        on:change={onChange}
      />
    </div>
  </Tabs>
  <TextField
    label="Origin"
    bind:value={origin}
    placeholder="Barbarian level 3"
  />
  <button on:click={done}>Done</button>
  <button on:click={close}>Cancel</button>
</Dialog>
