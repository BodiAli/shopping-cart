const API_KEY = "moby_EmWCjGDKP8Zp8WkkBolB5TI6ynj";
const PROXY_URL = "https://api.allorigins.win/get?url="; // AllOrigins proxy

async function getData(params) {
  const apiUrl = `https://api.mobygames.com/v1/games${params}api_key=${API_KEY}`;
  const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  // AllOrigins wraps the response in a "contents" field
  return JSON.parse(data.contents);
}

export default getData;
