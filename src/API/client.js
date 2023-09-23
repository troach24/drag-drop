const BASE_URL = "https://mh-rankings.poweredbyjourney.com";

export async function getPlayerData() {
  try {
    let request = await fetch(`${BASE_URL}/get_players`, {
      method: 'GET',
      headers: {
        "Content-Type": 'Application/json',
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
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
  let request = await fetch(`${BASE_URL}/update_players`, {
    method: 'POST',
    headers: {
      "Content-Type": 'Application/json',
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    body: JSON.stringify(data)
  })
  if (request.status !== 200) {
    throw new Error(`Error retreiving player data`);
  }
  const response = await request.json();
  return response;
}
