<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { Feature } from '../data'
  import TextField from './TextField.svelte'
  const dispatch = createEventDispatcher()

  export let feature: Feature

  let {
    name, description
  } = feature

  function update() {
    dispatch('change', { name, description })
  }
</script>

<div>
  <TextField
    label="Name"
    bind:value={name}
    on:blur={update}
    placeholder="Uncanny Dodge"
  />
  <TextField
    multiline
    label="Description"
    bind:value={description}
    on:blur={update}
  />
</div>
