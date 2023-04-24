<script lang="ts">
  import { randomNumbers } from '../utils';
  import Cell from './cell.svelte';
  const size = 10;
  const nopesCt = 10;

  type Cell = {
    value: number;
    status: 'covered' | 'uncovered' | 'flagged';
  };

  let gameover = false;

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

  function uncover(y: number, x: number, first = false) {
    if (x >= size || x < 0 || y >= size || y < 0) {
      return;
    }
    if (cells[y][x].status === 'uncovered') {
      return;
    }
    if (cells[y][x].value === -1 && first) {
      gameover = true;
      return;
    }
    if (cells[y][x].value > 0 && first) {
      cells[y][x].status = 'uncovered';
      return;
    }
    if (cells[y][x].value === 0) {
      cells[y][x].status = 'uncovered';
      setTimeout(() => {
        uncover(y - 1, x);
        uncover(y + 1, x);
        uncover(y, x - 1);
        uncover(y, x + 1);
      }, 50);
    }
  }

  function flag(y: number, x: number) {
    cells[y][x].status = 'flagged';
  }
</script>

<main class:gameover>
  {#each cells as row, y}
    {#each row as cell, x}
      <Cell
        {...cell}
        on:uncover={() => uncover(y, x, true)}
        on:flag={() => flag(y, x)}
      />
    {/each}
  {/each}
</main>

<style>
  main {
    display: inline-grid;
    --size: 40px;
    grid-template: repeat(10, var(--size)) / repeat(10, var(--size));
    border: solid 3px #ccc;
  }
  .gameover {
    border-color: #e55;
  }
</style>
