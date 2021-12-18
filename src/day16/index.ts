import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput
    .split('')
    .map((hex) => parseInt(hex, 16).toString(2).padStart(4, '0'))
    .join('');

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
        input: `D2FE28`,
        expected: '110100101111111000101000',
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
