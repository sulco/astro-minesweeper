<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value = 0;
  export let status: 'covered' | 'uncovered' = 'covered';
  const dispatch = createEventDispatcher();

  function uncover() {
    dispatch('uncover');
  }
</script>

<button class="cell {status}" on:click={uncover}>
  {#if value === -1}
    😮
  {:else if value > 0}
    {value}
  {/if}
</button>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    margin: 0 0 -1px -1px;
    position: relative;
  }
  .covered {
    opacity: 0.3;
    cursor: pointer;
  }
  .covered:hover {
    background: #1111;
  }
</style>
