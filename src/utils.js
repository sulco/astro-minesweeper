export function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

export function randomNumbers(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1)
    }
    return [...set];
  }
