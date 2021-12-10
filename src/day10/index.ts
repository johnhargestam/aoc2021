import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(/\n/);

const bracketsMatch = (a: string, b: string): boolean =>
  '([{<'.indexOf(a) === ')]}>'.indexOf(b);

const scoreTable: {[key:string]: number} = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let score = 0;

  for (const line of input) {
    const stack: string[] = [];

    for (const bracket of line) {
      if ('([{<'.includes(bracket)) {
        stack.push(bracket);
      } else {
        const last = stack.pop();
        if (last && !bracketsMatch(last, bracket)) {
          score += scoreTable[bracket];
          break;
        }
      }
      
    }
  }

  return score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
  onlyTests: true,
});
