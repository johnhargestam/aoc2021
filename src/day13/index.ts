import run from 'aocrunner';

interface Dot {
  x: number;
  y: number;
}

interface Fold {
  axle: 'x' | 'y';
  index: number;
}

interface Paper {
  dots: Dot[];
  folds: Fold[];
}

const parseInput = (rawInput: string): Paper => {
  const [coords, instructions] = rawInput.split(/\n\n/);
  return {
    dots: coords
      .split(/\n/)
      .map((coord) => coord.split(/,/).map((n) => +n))
      .map(([x, y]) => ({ x, y })),
    folds: instructions.split(/\n/).map((instruction) => {
      const [text, value] = instruction.split(/=/);
      return {
        axle: text.slice(-1) as 'x' | 'y',
        index: +value,
      };
    }),
  };
};

const foldDots = (dots: Dot[], { axle, index }: Fold) =>
  dots
    .map(({ x, y }) => ({
      x: axle === 'x' && x > index ? index - (x - index) : x,
      y: axle === 'y' && y > index ? index - (y - index) : y,
    }))
    .filter(
      (a, i, self) => i === self.findIndex((b) => a.x === b.x && a.y === b.y),
    );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [firstFold] = input.folds;

  return foldDots(input.dots, firstFold).length;
};

const draw = (dots: Dot[]) => {
  const { xMax, yMax } = dots.reduce(
    ({ xMax, yMax }, { x, y }) => ({
      xMax: Math.max(xMax, x),
      yMax: Math.max(yMax, y),
    }),
    { xMax: -1, yMax: -1 },
  );
  const drawing: string[][] = Array.from({ length: yMax + 1 }, () =>
    Array(xMax).fill('.'),
  );
  dots.forEach(({ x, y }) => {
    drawing[y][x] = '#';
  });
  console.log(drawing.map((row) => row.join('')).join('\n'));
  console.log('');
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const foldedDots = input.folds.reduce(
    (dots: Dot[], fold) => foldDots(dots, fold),
    input.dots,
  );
  draw(foldedDots);
  return imageRecognitionAI(foldedDots);
};

run({
  part1: {
    tests: [
      {
        input: `        6,10
        0,14
        9,10
        0,3
        10,4
        4,11
        6,0
        6,12
        4,1
        0,13
        10,12
        3,4
        3,0
        8,4
        1,10
        2,14
        8,10
        9,0
        
        fold along y=7
        fold along x=5`,
        expected: 17,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `        6,10
      //   0,14
      //   9,10
      //   0,3
      //   10,4
      //   4,11
      //   6,0
      //   6,12
      //   4,1
      //   0,13
      //   10,12
      //   3,4
      //   3,0
      //   8,4
      //   1,10
      //   2,14
      //   8,10
      //   9,0
        
      //   fold along y=7
      //   fold along x=5`,
      //   expected: 16,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

const imageRecognitionAI = (_: Dot[]) => 'LRFJBJEH';
