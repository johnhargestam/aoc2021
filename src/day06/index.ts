import run from 'aocrunner';

const parseInput = (rawInput: string): number[] =>
  rawInput
    .split(/\,/)
    .map((n) => +n)
    .reduce((ages, age) => {
      ages[age] += 1;
      return ages;
    }, Array(9).fill(0));

const part1 = (rawInput: string) => {
  const ages = parseInput(rawInput);

  for (let day = 1; day <= 80; day++) {
    let newborn = ages[0];
    for (let age = 1; age <= 8; age++) {
      ages[age - 1] = ages[age];
    }
    ages[6] += newborn;
    ages[8] = newborn;
  }

  return ages.reduce((fish, age) => fish + age, 0);
};

const part2 = (rawInput: string) => {
  const ages = parseInput(rawInput);

  for (let day = 1; day <= 256; day++) {
    let newborn = ages[0];
    for (let age = 1; age <= 8; age++) {
      ages[age - 1] = ages[age];
    }
    ages[6] += newborn;
    ages[8] = newborn;
  }

  return ages.reduce((fish, age) => fish + age, 0);
};

run({
  part1: {
    tests: [{ input: `3,4,3,1,2`, expected: 5934 }],
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
