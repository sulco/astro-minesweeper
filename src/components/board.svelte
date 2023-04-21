<script lang="ts">
    import { randomNumbers } from "../utils";
    const size = 10;
    const nopesCt = 3;

    let nopes = randomNumbers(3, size*size - 1);

    let cells = [...Array(size*size)].map((v, i) => {
        if (nopes.includes(i)) {
            return -1;
        }
        return 0;
    });

    nopes.forEach(v => {
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                const idx = v + size * y + x;
                if (nopes.includes(idx)) {
                    continue;
                }
                cells[idx] += 1;
            }
        }
    });
</script>

<main>
    {#each cells as cell}
        {#if !cell}
            <div class="cell"></div>
        {/if}
        {#if cell}
            <div class="cell" data-number={cell}>{cell > -1 ? cell : '😮'}</div>
        {/if}
    {/each}
</main>

<style>
    main {
        display: grid;
        --size: 40px;
        grid-template: repeat(10, var(--size)) / repeat(10, var(--size));
    }

    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        margin: 0 0 -1px -1px;
        position: relative;
    }

    /* .cell::before {
        content: attr(data-number);
        position: absolute;
        top: 0px;
        left: 1px;
        font-size: 11px;
        background: white;
        padding: 1px;
    } */
</style>