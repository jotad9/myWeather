const apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vi", "Sa"];

    return days[day];
}

function mapWeatherIcon(apiIcon) {
    // Mapea los valores de la API a tus rutas de imágenes personalizadas
    const iconMapping = {
        "01d": "./assets/images/clear.png",
        "02d": "./assets/images/partly-cloudy.png",
        "03d": "./assets/images/clouds.png",
        "04d": "./assets/images/clouds.png",
        "09d": "./assets/images/rain.png",
        "10d": "./assets/images/drizzle.png",
        "11d": "./assets/images/drizzle.png",
        "13d": "./assets/images/snow.png",
        "50d": "./assets/images/mist.png",
        // Puedes agregar más mapeos según sea necesario
    };

    // Devuelve la ruta de la imagen personalizada o una ruta predeterminada
    return iconMapping[apiIcon] || "./assets/images/default.png";
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 5) {
            forecastHTML =
                forecastHTML +
                `
        <div class="col-2 ml-3">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="${mapWeatherIcon(forecastDay.weather[0].icon)}"
            alt=""
            width="42"
        />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
        </div>
    `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    let celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    iconElement.setAttribute("alt", response.data.weather[0]);
    if (response.data.weather[0].main == "Clear") {
        iconElement.src = "./assets/images/clear.png";
    } else if (response.data.weather[0].main == "Clouds") {
        iconElement.src = "./assets/images/clouds.png";
    } else if (response.data.weather[0].main == "Rain") {
        iconElement.src = "./assets/images/rain.png";
    } else if (response.data.weather[0].main == "Mist") {
        iconElement.src = "./assets/images/mist.png";
    } else if (response.data.weather[0].main == "Drizzle") {
        iconElement.src = "./assets/images/drizzle.png";
    } else if (response.data.weather[0].main == "Snow") {
        iconElement.src = "./assets/images/snow.png";
    }
    getForecast(response.data.coord);
}

function search(city) {
    const params = {
        q: city,
        appid: apiKey,
        units: "metric"
    };

    axios.get(apiUrl, {
            params
        })
        .then(response => displayTemperature(response))
        .catch(error => {
            console.error("Error fetching weather data:", error);
            // Puedes agregar manejo de errores aquí si lo deseas
        });
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Madrid");



// Colores

let color = document.querySelector("#colores");
let links = color.querySelectorAll("a")

function changeColor() {
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            switch(links[i].id){
                case "morado":
                    document.body.style.background = "linear-gradient(135deg, #d03fe6, #427ec7)";
                    break;
                case "azul":
                    document.body.style.background = "linear-gradient(135deg, #3a7bd5, #3a6073)";
                    break;
                case "verde":
                    document.body.style.background = "linear-gradient(135deg, #6ce891, #427ec7)";
                    break;
                case "rojo":
                    document.body.style.background = "linear-gradient(135deg, #ea1919, #3c45f2)";
                    break;
                case "amarillo":
                    document.body.style.background = "linear-gradient(135deg, #ffcc00, #b38f00)";
                    break;
                case "naranja":
                    document.body.style.background = "linear-gradient(135deg, #ff6600, #b34700)";
                    break;
                case "rosa":
                    document.body.style.background = "linear-gradient(135deg,  #ff0080, #d03fe6)";
                    break;
            }
            
        });
    }
}

changeColor();