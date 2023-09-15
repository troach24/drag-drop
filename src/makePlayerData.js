import * as PlayerData from './player-data.json';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export default function makeData(...lens) {
  const players = PlayerData.players;
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      players[d].rank = `${players[d].position} ${players[d].ordinal}`;
      return {
        ...players[d],
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };
  return makeDataLevel();
}
