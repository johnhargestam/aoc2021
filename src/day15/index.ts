import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split(/\n(?:\s+)?/).map((line) => line.split('').map((n) => +n));

const pathfind = (map: number[][], x: number, y: number): number => {
  if (!map[y]?.[x]) {
    return Infinity;
  }
  if (y === map.length - 1 && x === map[y].length - 1) {
    return map[y][x];
  }
  return map[y][x] + Math.min(pathfind(map, x + 1, y), pathfind(map, x, y + 1));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return pathfind(input, 0, 0) - input[0][0];
};

const draw = (grid: number[][]) =>
  ['\n', ...grid.map((line) => line.join('')), '\n'].forEach((line) =>
    console.log(line),
  );

const part2 = (rawInput: string) => {
  const risks = parseInput(rawInput);
  const costs = risks.map((line) => line.map((_) => 0));
  for (let y = risks.length - 1; y >= 0; y--) {
    for (let x = risks[y].length - 1; x >= 0; x--) {
      const riskDown = risks[y + 1]?.[x];
      const costDown = costs[y + 1]?.[x];

      const riskRight = risks[y]?.[x + 1];
      const costRight = costs[y]?.[x + 1];

      const downEdge = y === risks.length - 1;
      const rightEdge = x === risks[y].length;

      if (downEdge && rightEdge) {
        costs[y][x] = 0;
      } else if (downEdge) {
        costs[y][x] = riskRight + costRight;
      } else if (rightEdge) {
        costs[y][x] = riskDown + costDown;
      } else {
        Math.min(riskRight + costRight, riskDown + costDown);
      }
    }
  }
  draw(costs);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `1163751742
        1381373672
        2136511328
        3694931569
        7463417111
        1319128137
        1359912421
        3125421639
        1293138521
        2311944581`,
        expected: 40,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1163751742
        1381373672
        2136511328
        3694931569
        7463417111
        1319128137
        1359912421
        3125421639
        1293138521
        2311944581`,
        expected: 40,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
