import run from "aocrunner";

interface Position {
  value: number;
  marked: boolean;
}

type Board = Position[][];

interface Bingo {
  balls: number[];
  boards: Board[];
}

const parseInput = (rawInput: string): Bingo => {
  const [balls, ...boards] = rawInput.split(/\n\n/);
  return {
    balls: balls
      .trim()
      .split(/,/)
      .map((num) => +num),
    boards: boards.map((str) =>
      str
        .trim()
        .split(/\n/)
        .map((line) =>
          line
            .trim()
            .split(/\s+/)
            .map((num) => ({ value: +num, marked: false })),
        ),
    ),
  };
};

const markBoard = (board: Board, ball: number): void => {
  for (const line of board) {
    for (const position of line) {
      if (position.value == ball) {
        position.marked = true;
      }
    }
  }
};

const isHorizontalWin = (board: Board): boolean =>
  board.some((line) => line.every((position) => position.marked));

const isVerticalCrossed = (board: Board, index: number): boolean => {
  for (const line of board) {
    if (!line[index].marked) {
      return false;
    }
  }
  return true;
};

const isVerticalWin = (board: Board): boolean => {
  for (let i = 0; i < 5; i++) {
    if (isVerticalCrossed(board, i)) {
      return true;
    }
  }
  return false;
};

const isBoardWon = (board: Board): boolean =>
  isHorizontalWin(board) || isVerticalWin(board);

const getWinner = (bingo: Bingo): [Board, number] => {
  for (const ball of bingo.balls) {
    for (const board of bingo.boards) {
      markBoard(board, ball);
      if (isBoardWon(board)) {
        return [board, ball];
      }
    }
  }

  return [bingo.boards[0], 0];
};

const getLastPlace = (bingo: Bingo): [Board, number] => {
  for (const ball of bingo.balls) {
    for (const board of bingo.boards) {
      markBoard(board, ball);
      if (bingo.boards.every((b) => isBoardWon(b))) {
        return [board, ball];
      }
    }
  }

  return [bingo.boards[0], 0];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [winner, winningBall] = getWinner(input);

  const remainingSum = winner
    .map((line) =>
      line.reduce(
        (sum, position) => (position.marked ? sum : sum + position.value),
        0,
      ),
    )
    .reduce((sum, lineSum) => sum + lineSum, 0);
  return remainingSum * winningBall;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [winner, winningBall] = getLastPlace(input);

  const remainingSum = winner
    .map((line) =>
      line.reduce(
        (sum, position) => (position.marked ? sum : sum + position.value),
        0,
      ),
    )
    .reduce((sum, lineSum) => sum + lineSum, 0);
  return remainingSum * winningBall;
};

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
  8  2 23  4 24
21  9 14 16  7
  6 10  3 18  5
  1 12 20 15 19

  3 15  0  2 22
  9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
  2  0 12  3  7`,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
  8  2 23  4 24
21  9 14 16  7
  6 10  3 18  5
  1 12 20 15 19

  3 15  0  2 22
  9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
  2  0 12  3  7`,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
