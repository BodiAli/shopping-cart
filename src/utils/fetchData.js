async function getData(params) {
  // Ensure params start with a slash if they represent a sub-route
  const url = `${import.meta.env.VITE_SERVER_URL}/api/games${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`Error: ${response.status} ${data.error}`);
  }

  const data = await response.json();
  return data; // Return the data from server
}

export default getData;
