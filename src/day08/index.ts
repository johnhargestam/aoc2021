import run from 'aocrunner';

const puzzleInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => {
    const [patterns, output] = line
      .split(/\s\|\s/)
      .map((values) => values.split(/\s/).map((value) => value.split('')));
    return { patterns, output };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((line) => line.output.map((value) => value.length))
    .flat()
    .filter((length) => [2, 3, 4, 7].includes(length)).length;
};

const digitSegments = {
  1: 'cf', //done
  7: 'acf', //done
  4: 'bcdf', //done
  2: 'acdeg',
  3: 'acdfg', //done
  5: 'abdfg',
  0: 'abcefg', //done
  6: 'abdefg', //done
  9: 'abcdfg', //done
  8: 'abcdefg', //done
};

const segmentDigits = {
  a: [0, 2, 3, 5, 6, 7, 8, 9],
  b: [0, 4, 5, 6, 8, 9],
  c: [0, 1, 2, 3, 4, 7, 8, 9],
  d: [2, 3, 4, 5, 6, 8, 9],
  e: [0, 2, 6, 8],
  f: [0, 1, 3, 4, 5, 6, 7, 8, 9],
  g: [0, 2, 3, 5, 6, 8, 9],
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const results = input.map(({ patterns, output }) => {
    const wiring: { [key: string]: string } = {};
    const key: string[][] = [];

    key[1] = patterns.filter((p) => p.length === 2)[0];
    key[7] = patterns.filter((p) => p.length === 3)[0];
    key[4] = patterns.filter((p) => p.length === 4)[0];
    key[8] = patterns.filter((p) => p.length === 7)[0];

    wiring['a'] = key[7].filter((c) => key[1].indexOf(c) === -1)[0];

    wiring['g'] = patterns
      .filter((pattern) => pattern.length === 6)
      .filter((p) => key[4].concat(wiring['a']).every((c) => p.includes(c)))[0]
      .filter((c) => key[4].concat(wiring['a']).indexOf(c) === -1)[0];

    wiring['e'] = key[8].filter(
      (c) => key[4].concat(wiring['a']).concat(wiring['g']).indexOf(c) === -1,
    )[0];

    key[9] = key[4].concat(wiring['a']).concat(wiring['g']);

    key[3] = patterns
      .filter((p) => p.length === 5)
      .filter((p) => key[1].every((c) => p.includes(c)))[0];

    wiring['d'] = key[3].filter(
      (c) => key[1].concat(wiring['a']).concat(wiring['g']).indexOf(c) === -1,
    )[0];

    key[0] = key[8].filter((c) => c !== wiring['d']);

    key[6] = patterns
      .filter((p) => p.length === 6)
      .filter((p) => !p.every((c) => key[0].includes(c)))
      .filter((p) => !p.every((c) => key[9].includes(c)))[0];

    key[2] = patterns
      .filter((p) => p.length === 5)
      .filter((p) => p.includes(wiring['e']))[0];

    key[5] = patterns
      .filter((p) => p.length === 5)
      .filter((p) => !p.every((c) => key[2].includes(c)))
      .filter((p) => !p.every((c) => key[3].includes(c)))[0];

    key.forEach((p) => p.sort());

    return +output.map((value) => {
      value.sort();
      return key.map((p) => p.join('')).indexOf(value.join(''));
    }).join('');
  });
  return results.reduce((total, result) => total + result, 0);
};

run({
  part1: {
    tests: [
      {
        input: puzzleInput,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
        expected: 5353,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
