<script lang="ts">
  import { randomNumbers } from '../utils';
  import Cell from './cell.svelte';
  const size = 10;
  const nopesCt = 10;

  type Cell = {
    value: number;
    status: 'covered' | 'uncovered';
  };

  let nopes = randomNumbers(nopesCt, size * size - 1);

  let cells: Cell[][] = [];
  for (let y = 0; y < size; y++) {
    cells.push([]);
    for (let x = 0; x < size; x++) {
      cells[y].push({ value: 0, status: 'covered' });
    }
  }

  nopes.forEach((index) => {
    const [x, y] = [index % size, Math.floor(index / size)];
    cells[y][x] = { value: -1, status: 'covered' };
    for (let y1 = y - 1; y1 <= y + 1; y1++) {
      if (y1 < 0 || y1 >= size) {
        continue;
      }
      for (let x1 = x - 1; x1 <= x + 1; x1++) {
        if (x1 < 0 || x1 >= size || nopes.includes(y1 * size + x1)) {
          continue;
        }
        cells[y1][x1].value++;
      }
    }
  });

  function uncover(y: number, x: number) {
    cells[y][x].status = 'uncovered';
  }
</script>

<main>
  {#each cells as row, y}
    {#each row as cell, x}
      <Cell {...cell} on:uncover={() => uncover(y, x)} />
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
