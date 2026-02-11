async function getWeather() {

    const city = document.getElementById("city").value;

    try {

        // STEP 1 — Get Latitude & Longitude from City Name
        const geoUrl =
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results) {
            document.getElementById("result").innerHTML = "City not found";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // STEP 2 — Get Weather Using Coordinates
        const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;

        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        document.getElementById("result").innerHTML = `
            <h3>${city.toUpperCase()}</h3>
            <p> Temperature: ${weatherData.current.temperature_2m} °C</p>
            <p> Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
            <p> Humidity: ${weatherData.current.relative_humidity_2m} %</p>
        `;

    } catch {
        document.getElementById("result").innerHTML = "Error getting weather data";
    }
}
