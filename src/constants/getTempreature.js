export const getTemperature = async ({ lat, lon }) => {
  const ApiKey = '51008b613c50e28769619182d096dc71';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`;

  console.log(url);
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const temperature = data.main.temp;
      return temperature;
    } else {
      console.error('Failed to fetch data');
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
