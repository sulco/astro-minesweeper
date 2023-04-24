<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value = 0;
  export let status: 'covered' | 'uncovered' | 'flagged' = 'covered';
  const dispatch = createEventDispatcher();

  function uncover() {
    dispatch('uncover');
  }

  function flag(event) {
    event.preventDefault();
    dispatch('flag');
  }
</script>

<button class="cell {status}" on:click={uncover} on:contextmenu={flag}>
  <div class="content">
    {#if value === -1}
      😵
    {:else if value > 0}
      {value}
    {/if}
  </div>
</button>

<style>
  .cell {
    border: 1px solid #aaa;
    margin: 0 0 -1px -1px;
    position: relative;
  }
  .covered,
  .flagged {
    cursor: pointer;
  }
  .covered:hover,
  .flagged:hover {
    background: #1111;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .covered .content,
  .flagged .content {
    transition: opacity 250ms;
    opacity: 0;
  }
  .uncovered .content {
    opacity: 1;
    background: white;
  }
  .flagged::before {
    content: '🚩';
  }
</style>
