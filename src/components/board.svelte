<script lang="ts">
    let cells = [...Array(100)].map((v, i) => i);
</script>

<main>
    {#each cells as cell}
       <div class="cell">{cell}</div>
    {/each}
</main>

<style>
    main {
        display: grid;
        --size: 30px;
        grid-template: repeat(10, var(--size)) / repeat(10, var(--size));
    }

    .cell {
        text-align: center;
        border: 1px solid #eee;
        margin: 0 0 -1px -1px;
    }
</style>