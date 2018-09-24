function processRecievedData(data) {
  
  const lat = (data.coord && data.coord.lat) || 0;
  const lon =(data.coord && data.coord.lon) || 0;

  const weather = (data.weather && data.weather[0]) || null;
  const main = data.main || null;

  return data ? {
    name: `${data.name || 'Nothingtown'}, ${(data.sys && data.sys.country) || `lat: ${lat}, lon: ${lon}`}`,
    icon: (weather && weather.icon) || 'na',
    weather: (weather && weather.description) || 'nothing',
    temp: (main && main.temp) || 273.15,
    humidity: (main && main.humidity) || 0,
    wind: (data.wind && data.wind.speed) || 0,
    coordinates: [lat, lon]
  } : {
    name: 'N/A',
    icon: 'na',
    weather: 'N/A',
    temp: 273.15,
    wind: 0,
    coordinates: [0, 0]
  };
}

export async function fetchWeatherDataCoords(coordinates) {
  const [lat, lon] = coordinates;
  let response;
  let data;
  try {
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=de2fec26642e64c6f6d224ebdffcb8fd`);
    data = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('error', e);
  }
  return processRecievedData(data);
}