<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { status } from "../data";
  import Dialog from "../Dialog.svelte";
  import TextField from "./TextField.svelte";
  const dispatch = createEventDispatcher();

  let name = "";
  let weight = 0;
  let count = 1;
  let description = "";

  function close() {
    dispatch("close");
  }

  function done() {
    status.update(status => ({
      ...status,
      inventory: [...status.inventory, { name, weight, count, description }]
    }));
    close();
  }
</script>

<Dialog on:close>
  <TextField label="Name" bind:value={name} />
  <TextField label="Weight" bind:value={weight} />
  <TextField label="Count" bind:value={count} />
  <TextField label="Description" bind:value={description} multiline />
  <button on:click={close}>Cancel</button>
  <button on:click={done}>Done</button>
</Dialog>
