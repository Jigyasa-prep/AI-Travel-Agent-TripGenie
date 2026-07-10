const API_KEY = "31c79b884374e0e324c400834b8abfe3";

export async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Weather not found");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}