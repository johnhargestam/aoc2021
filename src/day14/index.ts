import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  const [template, rules] = rawInput.split(/\n\n/);
  return {
    template,
    rules: rules.split(/\n/).map((rule) => {
      const [pair, insert] = rule.split(/ -> /);
      return { pair, insert };
    }),
  };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let { template } = input;

  for (let steps = 1; steps <= 10; steps++) {
    let newTemplate = template[0];
    for (let c = 0; c < template.length + 1; c++) {
      const [t1, t2] = template.slice(c, c + 2);
      for (const { pair, insert } of input.rules) {
        const [r1, r2] = pair;
        if (t1 === r1 && t2 === r2) {
          newTemplate += `${insert}${t2}`;
          break;
        }
      }
    }
    template = newTemplate;
  }
  const map = template.split('').reduce((map: {[key: string]: number}, letter) => {
    map[letter] = 1 + (map[letter] || 0);
    return map;
  }, {});
  const counts = Object.keys(map).map(key => map[key]);

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
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
