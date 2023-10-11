const ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const BASE_URL = ENV === 'development' ? process.env.REACT_APP_DEV_ENDPOINT
  : process.env.REACT_APP_PROD_ENDPOINT;

export async function getPlayerData() {
  try {
    let request = await fetch(`${BASE_URL}/get_players`, {
      method: 'GET',
      headers: {
        "Content-Type": 'Application/json',
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${ENV === 'development' ? process.env.REACT_APP_API_DEV_TOKEN
          : process.env.REACT_APP_API_TOKEN}`,
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
      "Authorization": `Bearer ${ENV === 'development' ? process.env.REACT_APP_API_DEV_TOKEN
          : process.env.REACT_APP_API_TOKEN}`,
    },
    body: JSON.stringify(data)
  })
  if (request.status !== 200) {
    throw new Error(`Error updating player rankings`);
  }
  const response = await request.json();
  return response;
}

export async function updatePlayerNote(_id, note) {
  let request = await fetch(`${BASE_URL}/update_player_note`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'Application/json',
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${ENV === 'development' ? process.env.REACT_APP_API_DEV_TOKEN
      : process.env.REACT_APP_API_TOKEN}`,
    },
    body: JSON.stringify({
      _id: _id,
      note: note
    })
  })
  console.log(request);
  if (request.status !== 200) {
    throw new Error(`Error updating player note with ID: ${_id}`);
  }
  const response = await request.json();
  return response;
}
