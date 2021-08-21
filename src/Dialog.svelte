<script lang="ts">
  import { fly } from 'svelte/transition'
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  onMount(() => {
    document.getElementsByTagName('main')[0].style.filter = 'blur(8px)'
    history.pushState('dialog', null)
  })

  function destroy() {
    document.getElementsByTagName('main')[0].style.filter = null
    if (history.state === 'dialog') history.back()
  }

  function close() {
    dispatch('close')
  }

  function portal(node: HTMLElement, parameters = { target: document.body }) {
    parameters.target.append(node)
  }
</script>

<svelte:window on:keydown={e => e.key == 'Escape' && close()} on:popstate={close} />

<div class="scrim" use:portal on:click={close}>
  <div on:click|stopPropagation transition:fly={{ duration: 300, y: -50 }} on:outrostart={destroy} class="material">
    <slot />
  </div>
</div>

<style>
  .scrim {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    display: flex;
    overflow: auto;
    align-items: center;
    justify-content: center;
  }

  .material {
    border-radius: 0.25rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    padding: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
