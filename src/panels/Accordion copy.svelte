<script lang="ts">
  import { slide } from "svelte/transition";

  export let title;
  export let subtitle = undefined;
  export let content;
  export let expanded = false;
</script>

<div on:click class:expanded class="accordion">
  <div class="header">
    {title}
    {#if subtitle !== undefined}
      <div class="text-light text-xs">
        {subtitle}
      </div>
    {/if}
  </div>
  {#if expanded}
    <p transition:slide={{ duration: 200 }}>
      {content}
    </p>
  {/if}
</div>

<style lang="postcss">
  .accordion {
    padding: 0 var(--s-4);
    position: relative;
    cursor: pointer;
    transition: margin 200ms;

    &::before {
      position: absolute;
      top: -1px;
      right: 0;
      left: 0;
      display: block;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.06);
      content: "";
      opacity: 1;
      transition: opacity 200ms;
    }

    &.expanded::before,
    &.expanded + :global(.accordion::before) {
      opacity: 0;
    }

    &:last-child {
      border-radius: 0 0 var(--s-1) var(--s-1);
    }

    &.expanded .header {
      padding: var(--s-5) 0;
    }
  }

  .header {
    padding: var(--s-3) 0;
    font-size: var(--text-lg);
    transition: padding 200ms;
  }

  .p {
    /* @mixin p-4; */
    white-space: pre-wrap;
    font-size: var(--text-sm);
  }
</style>
