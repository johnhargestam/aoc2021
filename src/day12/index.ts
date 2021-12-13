import run from 'aocrunner';
import { type } from 'os';

enum Type {
  START,
  END,
  SMALL,
  BIG,
}

interface Cave {
  type: Type;
  name: string;
}

type Connection = [Cave, Cave];

const typeOfName = (name: string): Type => {
  if (name === 'start') {
    return Type.START;
  }
  if (name === 'end') {
    return Type.END;
  }
  if (/[a-z]+/.test(name)) {
    return Type.SMALL;
  }
  return Type.BIG;
};

const parseInput = (rawInput: string): Connection[] =>
  rawInput.split(/\n(?:\s+)?/).map(
    (connection) =>
      connection.split(/-/).map((name) => ({
        name,
        type: typeOfName(name),
      })) as Connection,
  );

const canVisit = (pastCaves: Cave[], cave: Cave): boolean =>
  cave.type === Type.END ||
  cave.type === Type.BIG ||
  (cave.type === Type.SMALL &&
    !pastCaves.map((past) => past.name).includes(cave.name));

const explore = (connections: Connection[], pastCaves: Cave[]) => {
  const [position] = pastCaves.slice(-1);
  if (position.type === Type.END) {
    return 1;
  }
  let paths = 0;
  for (const [a, b] of connections) {
    if (a.name === position.name && canVisit(pastCaves, b)) {
      paths += explore(connections, pastCaves.concat(b));
    } else if (b.name === position.name && canVisit(pastCaves, a)) {
      paths += explore(connections, pastCaves.concat(a));
    }
  }
  return paths;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return explore(input, [{ name: 'start', type: Type.START }]);
};

const canVisit2 = (cave: Cave): boolean => cave.type !== Type.START;

const exceededVisits = (pastCaves: Cave[]): boolean => {
  const smallCaves = pastCaves
    .filter((c) => c.type === Type.SMALL)
    .map((c) => c.name);
  return new Set(smallCaves).size + 1 < smallCaves.length;
};

const explore2 = (connections: Connection[], pastCaves: Cave[]) => {
  const [position] = pastCaves.slice(-1);
  if (position.type === Type.END) {
    return 1;
  }
  if (exceededVisits(pastCaves)) {
    return 0;
  }
  let paths = 0;
  for (const [a, b] of connections) {
    if (a.name === position.name && canVisit2(b)) {
      paths += explore2(connections, pastCaves.concat(b));
    } else if (b.name === position.name && canVisit2(a)) {
      paths += explore2(connections, pastCaves.concat(a));
    }
  }
  return paths;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return explore2(input, [{ name: 'start', type: Type.START }]);
};

run({
  part1: {
    tests: [
      {
        input: `start-A
        start-b
        A-c
        A-b
        b-d
        A-end
        b-end`,
        expected: 10,
      },
      {
        input: `dc-end
        HN-start
        start-kj
        dc-start
        dc-HN
        LN-dc
        HN-end
        kj-sa
        kj-HN
        kj-dc`,
        expected: 19,
      },
      {
        input: `fs-end
        he-DX
        fs-he
        start-DX
        pj-DX
        end-zg
        zg-sl
        zg-pj
        pj-he
        RW-he
        fs-DX
        pj-RW
        zg-RW
        start-pj
        he-WI
        zg-he
        pj-fs
        start-RW`,
        expected: 226,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `start-A
        start-b
        A-c
        A-b
        b-d
        A-end
        b-end`,
        expected: 36,
      },
      {
        input: `dc-end
        HN-start
        start-kj
        dc-start
        dc-HN
        LN-dc
        HN-end
        kj-sa
        kj-HN
        kj-dc`,
        expected: 103,
      },
      {
        input: `fs-end
        he-DX
        fs-he
        start-DX
        pj-DX
        end-zg
        zg-sl
        zg-pj
        pj-he
        RW-he
        fs-DX
        pj-RW
        zg-RW
        start-pj
        he-WI
        zg-he
        pj-fss
        start-RW`,
        expected: 3509,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
