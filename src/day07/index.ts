import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(/,/).map((n) => +n);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let min = Number.MAX_VALUE;
  let max = 0;
  for (const position of input) {
    if (position < min) {
      min = position;
    }
    if (position > max) {
      max = position;
    }
  }

  let idealPosition = {
    position: 0,
    fuel: Number.MAX_VALUE,
  };
  for (let i = min; i <= max; i++) {
    let fuel = 0;
    for (const position of input) {
      fuel += Math.abs(position - i);
    }
    if (fuel < idealPosition.fuel) {
      idealPosition.fuel = fuel;
      idealPosition.position = i;
    }
  }
  return idealPosition.fuel;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let min = Number.MAX_VALUE;
  let max = 0;
  for (const position of input) {
    if (position < min) {
      min = position;
    }
    if (position > max) {
      max = position;
    }
  }

  let idealPosition = {
    position: 0,
    fuel: Number.MAX_VALUE,
  };
  for (let i = min; i <= max; i++) {
    let fuel = 0;
    for (const position of input) {
      const distance = Math.abs(position - i);
      fuel += (distance / 2) * (1 + distance);
    }
    if (fuel < idealPosition.fuel) {
      idealPosition.fuel = fuel;
      idealPosition.position = i;
    }
  }
  return idealPosition.fuel;
};

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
