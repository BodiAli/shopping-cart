const API_KEY = "moby_EmWCjGDKP8Zp8WkkBolB5TI6ynj";

async function getData(params) {
  const response = await fetch(`/api/v1/games${params}api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}
export default getData;
