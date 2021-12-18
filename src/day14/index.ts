import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  const [template, rules] = rawInput.split(/\n\n/);
  return {
    template,
    rules: rules.split(/\n/).reduce((rules, rule) => {
      const [match, insert] = rule.split(/ -> /);
      return { ...rules, [match]: insert};
    }, {}),
  };
};

interface Letters {
  [letter: string]: number;
}

interface Rules {
  [match: string]: string;
}

const polymerize = (
  letters: Letters,
  pair: string,
  rules: Rules,
  times: number,
) => {
  if (times <= 0) {
    return;
  }
  letters[rules[pair]] = 1 + (letters[rules[pair]] || 0);
  polymerize(letters, `${pair.at(0)}${rules[pair]}`, rules, times - 1);
  polymerize(letters, `${rules[pair]}${pair.at(1)}`, rules, times - 1);
};

const part1 = (rawInput: string) => {
  const { template, rules } = parseInput(rawInput);

  const letters = template.split('').reduce((letters: Letters, c) => {
    letters[c] = 1 + (letters[c] || 0);
    return letters;
  }, {});
  for (let c = 0; c < template.length - 1; c++) {
    const pair = template.slice(c, c + 2);
    polymerize(letters, pair, rules, 10);
  }
  const counts = Object.keys(letters).map((c) => letters[c]);

  return Math.max(...counts) - Math.min(...counts);
};

const part2 = (rawInput: string) => {
  const { template, rules } = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `        NNCB

        CH -> B
        HH -> N
        CB -> H
        NH -> C
        HB -> C
        HC -> B
        HN -> C
        NN -> C
        BH -> H
        NC -> B
        NB -> B
        BN -> B
        BB -> N
        BC -> B
        CC -> N
        CN -> C`,
        expected: 1588,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `        NNCB
      //   CH -> B
      //   HH -> N
      //   CB -> H
      //   NH -> C
      //   HB -> C
      //   HC -> B
      //   HN -> C
      //   NN -> C
      //   BH -> H
      //   NC -> B
      //   NB -> B
      //   BN -> B
      //   BB -> N
      //   BC -> B
      //   CC -> N
      //   CN -> C`,
      //   expected: 1588,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
