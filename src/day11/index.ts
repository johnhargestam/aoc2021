import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split(/\n(?:\s+)?/).map((line) => line.split('').map((num) => +num));

const flash = (map: number[][], row: number, col: number): number => {
  if (!map[row]?.[col]) {
    return 0;
  }
  if (map[row][col] < 9) {
    map[row][col] += 1;
    return 0;
  }
  map[row][col] = 0;
  return (
    flash(map, row - 1, col) + //up
    flash(map, row - 1, col + 1) + //up-right
    flash(map, row, col + 1) + // right
    flash(map, row + 1, col + 1) + //down-right
    flash(map, row + 1, col) + //down
    flash(map, row + 1, col - 1) + //down-left
    flash(map, row, col - 1) + //left
    flash(map, row - 1, col - 1) + //up-left
    1
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let flashes = 0;

  for (let steps = 0; steps < 100; steps++) {
    input.forEach((line, row) =>
      line.forEach((_, col) => {
        input[row][col] += 1;
      }),
    );
    input.forEach((line, row) =>
      line.forEach((energy, col) => {
        if (energy > 9) {
          flashes += flash(input, row, col);
        }
      }),
    );
  }
  return flashes;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (let steps = 1; ; steps++) {
    input.forEach((line, row) =>
      line.forEach((_, col) => {
        input[row][col] += 1;
      }),
    );
    input.forEach((line, row) =>
      line.forEach((energy, col) => {
        if (energy > 9) {
          flash(input, row, col);
        }
      }),
    );
    const totalEnergy = input.reduce(
      (total, line) => total + line.reduce((sum, energy) => sum + energy, 0),
      0,
    );
    if (totalEnergy === 0) {
      return steps;
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `5483143223
        2745854711
        5264556173
        6141336146
        6357385478
        4167524645
        2176841721
        6882881134
        4846848554
        5283751526`,
        expected: 1656,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `5483143223
        2745854711
        5264556173
        6141336146
        6357385478
        4167524645
        2176841721
        6882881134
        4846848554
        5283751526`,
        expected: 195,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
