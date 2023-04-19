<script lang="ts">
import { getMultipleRandom, randomNumbers } from "../utils";
    const size = 100;

    let nopes = randomNumbers(10, size - 1);

    let cells = [...Array(size)].map((v, i) => {
        if (nopes.includes(i)) {
            return '😮'
        }
        return i;
    });
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