import run from "aocrunner";

interface Coord {
  x: number;
  y: number;
}

interface Line {
  from: Coord;
  to: Coord;
}

const parseInput = (rawInput: string): Line[] =>
  rawInput.split(/\s*?\n\s*?/).map((line) => {
    const [from, , to] = line.split(/\s/).map((coord) => {
      const [x, y] = coord.split(/,/).map((num) => +num);
      return { x, y };
    });
    return { from, to };
  });

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).filter(
    (line) => line.from.x == line.to.x || line.from.y == line.to.y,
  );

  const visits: Record<string, number> = {};

  for (const line of lines) {
    const minX = Math.min(line.from.x, line.to.x);
    const maxX = Math.max(line.from.x, line.to.x);
    const minY = Math.min(line.from.y, line.to.y);
    const maxY = Math.max(line.from.y, line.to.y);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const key = `${x},${y}`;
        if (visits[key]) {
          visits[key] += 1;
        } else {
          visits[key] = 1;
        }
      }
    }
  }

  let doubles = 0;
  for (const coord in visits) {
    if (visits[coord] > 1) {
      doubles += 1;
    }
  }

  return doubles;
};

const approach = (position: Coord, target: Coord): Coord => ({
  x: position.x + Math.sign(target.x - position.x),
  y: position.y + Math.sign(target.y - position.y),
});

const equal = (a: Coord, b: Coord): boolean => a.x == b.x && a.y == b.y;

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  const visits: Record<string, number> = {};

  for (const line of lines) {
    for (
      let position = line.from;
      !equal(position, line.to);
      position = approach(position, line.to)
    ) {
      const key = `${position.x},${position.y}`;
      if (visits[key]) {
        visits[key] += 1;
      } else {
        visits[key] = 1;
      }
    }

    const key = `${line.to.x},${line.to.y}`;
    if (visits[key]) {
      visits[key] += 1;
    } else {
      visits[key] = 1;
    }
  }

  let doubles = 0;
  for (const coord in visits) {
    if (visits[coord] > 1) {
      doubles += 1;
    }
  }

  return doubles;
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
