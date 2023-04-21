<script lang="ts">
  export let value = 0;
</script>

<div class="cell" data-number={value}>
  {#if value === -1}
    😮
  {:else if value > 0}
    {value}
  {/if}
</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    margin: 0 0 -1px -1px;
    position: relative;
  }
</style>
