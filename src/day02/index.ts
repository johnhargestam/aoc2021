import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(/\n/);

interface Position {
  horizontal: number;
  depth: number;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const position = input.reduce(
    ({ horizontal, depth }: Position, instruction: string) => {
      const [command, number] = instruction.split(/\s/);
      if (/forward/.test(command)) {
        return { depth, horizontal: horizontal + +number };
      }
      if (/down/.test(command)) {
        return { horizontal, depth: depth + +number };
      }
      if (/up/.test(command)) {
        return { horizontal, depth: depth - +number };
      }
      return { horizontal, depth };
    },
    { horizontal: 0, depth: 0 },
  );

  return position.horizontal * position.depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let aim = 0;

  const position = input.reduce(
    ({ horizontal, depth }: Position, instruction: string) => {
      const [command, number] = instruction.split(/\s/);
      if (/down/.test(command)) {
        aim += +number;
      }
      if (/up/.test(command)) {
        aim -= +number;
      }
      if (/forward/.test(command)) {
        return {
          depth: depth + aim * +number,
          horizontal: horizontal + +number,
        };
      }
      return { horizontal, depth };
    },
    { horizontal: 0, depth: 0 },
  );

  return position.horizontal * position.depth;
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
