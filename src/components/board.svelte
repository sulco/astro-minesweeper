<script lang="ts">
  import { randomNumbers } from '../utils';
  import Cell from './cell.svelte';
  const size = 10;
  const nopesCt = 10;

  let nopes = randomNumbers(nopesCt, size * size - 1);

  let cells = [];
  for (let y = 0; y < size; y++) {
    cells.push([]);
    for (let x = 0; x < size; x++) {
      cells[y].push(0);
    }
  }

  nopes.forEach((index) => {
    const [x, y] = [index % size, Math.floor(index / size)];
    cells[y][x] = -1;
    for (let y1 = y - 1; y1 <= y + 1; y1++) {
      if (y1 < 0 || y1 >= size) {
        continue;
      }
      for (let x1 = x - 1; x1 <= x + 1; x1++) {
        if (x1 < 0 || x1 >= size || nopes.includes(y1 * size + x1)) {
          continue;
        }
        cells[y1][x1]++;
      }
    }
  });
</script>

<main>
  {#each cells as row}
    {#each row as cell}
      <Cell value={cell} />
    {/each}
  {/each}
</main>

<style>
  main {
    display: grid;
    --size: 40px;
    grid-template: repeat(10, var(--size)) / repeat(10, var(--size));
  }
</style>
