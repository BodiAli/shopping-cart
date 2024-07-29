async function getData(key) {
  const response = await fetch(`/api/v1/games?api_key=${key}`);

  const data = await response.json();
  console.log(data);
}

export default getData;
