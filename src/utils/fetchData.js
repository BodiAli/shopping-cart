async function getData(params) {
  // Ensure params start with a slash if they represent a sub-route
  const url = `http://localhost:3000/api/games${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data; // Return the data from your server
}

export default getData;
