import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => line.split('').map((n) => +n));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lowPoints: number[] = [];

  for (const [col, line] of input.entries()) {
    for (const [row, height] of line.entries()) {
      const up = input[col - 1]?.[row];
      const right = input[col]?.[row + 1];
      const down = input[col + 1]?.[row];
      const left = input[col]?.[row - 1];

      if (
        (up === undefined || height < up) &&
        (right === undefined || height < right) &&
        (down === undefined || height < down) &&
        (left === undefined || height < left)
      ) {
        lowPoints.push(height + 1);
      }
    }
  }
  return lowPoints.reduce((total, height) => total + height, 0);
};

interface Node {
  height: number;
  visited: boolean;
}

const fill = (
  map: Node[][],
  col: number,
  row: number,
  previousHeight?: number,
): number => {
  const node = map[col]?.[row];
  if (
    node === undefined ||
    node.visited ||
    node.height > 8 ||
    node.height < previousHeight!
  ) {
    return 0;
  }
  node.visited = true;

  return (
    fill(map, col - 1, row, node.height) +
    fill(map, col, row + 1, node.height) +
    fill(map, col + 1, row, node.height) +
    fill(map, col, row - 1, node.height) +
    1
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const basinSizes: number[] = [];

  for (const [col, line] of input.entries()) {
    for (const [row] of line.entries()) {
      const map = input.map((line) =>
        line.map((height) => ({ height, visited: false })),
      );
      const size = fill(map, col, row);
      basinSizes.push(size);
    }
  }
  basinSizes.sort((a, b) => b - a);
  return basinSizes.slice(0, 3).reduce((result, size) => result * size, 1);
};

run({
  part1: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
