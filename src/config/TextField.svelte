<script lang="ts">
  export let label: string;
  export let value: number | string;
  export let multiline: boolean = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
  {label}
  {#if multiline}
    <textarea {...$$restProps} bind:value on:change on:blur />
  {:else}
    <input {...$$restProps} bind:value on:change on:blur />
  {/if}
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input,
  textarea {
    appearance: none;
    border: 1px solid lightgray;
    background-image: none;
    background-color: #f2f2f2;
    padding: 0.75rem 1rem;
    outline: none;
    color: #686868;
    margin: 0.25rem 1rem;
  }

  input:focus,
  textarea:focus {
    background-color: #e6e6e6;
  }
</style>
