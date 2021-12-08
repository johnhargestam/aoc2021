import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(/\n/);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce(
    (increases: number, depth: string, index: number) =>
      increases + +(index > 0 && +depth > +input[index - 1]),
    0,
  );
};

const windowSum = (depths: string[], index: number) =>
  +depths[index] + +depths[index - 1] + +depths[index - 2];

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce(
    (increases: number, _, index: number) =>
      increases +
      +(index > 2 && windowSum(input, index) > windowSum(input, index - 1)),
    0,
  );
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
