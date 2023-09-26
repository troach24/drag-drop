import * as PlayerData from './player-data.json'; // use for local dev
import { getPlayerData } from "./API/client";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export default async function makeData(...lens) {
  // const players = PlayerData.players; // use for local dev
  const players = await getPlayerData();
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...players[d],
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };
  return makeDataLevel();
}
