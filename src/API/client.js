const BASE_URL = "https://mh-rankings.poweredbyjourney.com";
// import { API_TOKEN } from "../credentials";


export async function getPlayerData() {
  try {
    let request = await fetch(`${BASE_URL}/get_players`, {
      method: 'GET',
      headers: {
        "Content-Type": 'Application/json',
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    })
    if (request.status !== 200) {
      throw new Error(`Error retreiving player data`);
    }
    let response = await request.json();
    let body = JSON.parse(response.body);
    return body.players;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePlayerData(data) {
  console.log('UPDATE PLAYER DATA ATTEMPT');
  console.log('data to send:', data);
  let request = await fetch(`${BASE_URL}/update_players`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify(data)
  })
  if (request.status !== 200) {
    throw new Error(`Error retreiving player data`);
  }
  const response = await request.json();
  return response;
}