import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(/\n/);

const bracketsMatch = (a: string, b: string): boolean =>
  '([{<'.indexOf(a) === ')]}>'.indexOf(b);

const scoreTable1: { [key: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let score = 0;

  for (const line of input) {
    const stack: string[] = [];

    for (const bracket of line) {
      if ('([{<'.includes(bracket)) {
        stack.push(bracket);
      } else {
        const unclosed = stack.pop();
        if (unclosed && !bracketsMatch(unclosed, bracket)) {
          score += scoreTable1[bracket];
          break;
        }
      }
    }
  }

  return score;
};

const scoreTable2: { [key: string]: number } = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const stacks: string[][] = input
    .map((line) => {
      const stack: string[] = [];

      for (const bracket of line) {
        if ('([{<'.includes(bracket)) {
          stack.push(bracket);
        } else {
          const unclosed = stack.pop();
          if (unclosed && !bracketsMatch(unclosed, bracket)) {
            return undefined;
          }
        }
      }
      return stack;
    })
    .filter((stack): stack is string[] => stack !== undefined);

  const scores = stacks.map((stack) => {
    let score = 0;
    for (let i = stack.length - 1; i >= 0; i--) {
      score = score * 5 + scoreTable2[stack[i]];
    }
    return score;
  });
  scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
};

run({
  part1: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
