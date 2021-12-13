import run from 'aocrunner';

interface Dot {
  x: number;
  y: number;
}

interface Fold {
  axle: 'x' | 'y';
  index: number;
}

interface Paper {
  dots: Dot[];
  folds: Fold[];
}

const parseInput = (rawInput: string) => {
  const [coords, instructions] = rawInput.split(/\n\n/);
  return {
    dots: coords
      .split(/\n/)
      .map((coord) => coord.split(/,/).map((n) => +n))
      .map(([x, y]) => ({ x, y })),
    folds: instructions.split(/\n/).map(instruction => {
      const [text, value] = instruction.split(/=/);
      return ({
        axle: text.slice(-1),
        index: +value,
      }) 
    }),
  };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `        6,10
        0,14
        9,10
        0,3
        10,4
        4,11
        6,0
        6,12
        4,1
        0,13
        10,12
        3,4
        3,0
        8,4
        1,10
        2,14
        8,10
        9,0
        
        fold along y=7
        fold along x=5`,
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: 0
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
