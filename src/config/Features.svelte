<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ArrayChange, Feature } from "../data";
  import { ChangeType } from "../data";
  import FeatureForm from "./FeatureForm.svelte";
  const dispatch = createEventDispatcher();

  let value: ReadonlyArray<Feature> = [];

  function add() {
    value = [...value, { name: "", description: "" }];
  }

  function onChange(e: CustomEvent<Feature>, feature: Feature) {
    value = value.map(o => (o == feature ? e.detail : o));
    const detail: ArrayChange = {
      type: ChangeType.array,
      key: "features",
      value
    };
    dispatch("change", detail);
  }
</script>

<h1>Features</h1>
<div>
  {#each value as feature}
    <FeatureForm {feature} on:change={e => onChange(e, feature)} />
  {/each}
  <button on:click={add}>Add a feature</button>
</div>
