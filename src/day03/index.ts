import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(/\s*?\n\s*?/);

type Sum = {
  ones: number;
  zeros: number;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = input.reduce((sums: Sum[], binary: string) => {
    for (const [index, bit] of [...binary].entries()) {
      if (!sums[index]) {
        sums[index] = { ones: 0, zeros: 0 };
      }
      if (+bit > 0) {
        sums[index].ones += 1;
      } else {
        sums[index].zeros += 1;
      }
    }
    return sums;
  }, []);
  const gamma = result
    .map(({ ones, zeros }) => (ones > zeros ? "1" : "0"))
    .join("");
  const epsilon = result
    .map(({ ones, zeros }) => (ones < zeros ? "1" : "0"))
    .join("");

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let oxygenBinaries = input.slice();
  let co2Binaries = input.slice();

  for (let i = 0; i < input[0].length; i++) {
    let ones = 0;
    for (const binary of oxygenBinaries) {
      ones += +binary[i];
    }
    const mostCommon = ones >= oxygenBinaries.length / 2 ? "1" : "0";
    oxygenBinaries = oxygenBinaries.filter(
      (binary) => binary[i] === mostCommon,
    );

    if (oxygenBinaries.length === 1) {
      break;
    }
  }

  for (let i = 0; i < input[0].length; i++) {
    let ones = 0;
    for (const binary of co2Binaries) {
      ones += +binary[i];
    }
    const leastCommon = ones >= co2Binaries.length / 2 ? "0" : "1";
    co2Binaries = co2Binaries.filter((binary) => binary[i] === leastCommon);
    if (co2Binaries.length === 1) {
      break;
    }
  }

  return parseInt(oxygenBinaries[0], 2) * parseInt(co2Binaries[0], 2);
};

run({
  part1: {
    tests: [
      {
        input: `
      00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
