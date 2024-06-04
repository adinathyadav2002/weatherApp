const cityName = document.getElementById("input-name");
const subButton = document.getElementById("submit-button");
const disName = document.getElementById("city-name");
const key = "e618835a3df8492eddcbb17f34146147";
const cityTem = document.getElementById("city-tem");
const weatherMain = document.getElementById("weather-main")
const humidity = document.getElementById("city-hum")
const currDate = document.getElementById("date")
const currTime = document.getElementById("time")
const wd = document.getElementById("weatherd-display")

const thunderstormArray = ["thunderstorm with light rain", "thunderstorm with rain", "light thunderstorm", "thunderstorm", "heavy thunderstorm", "ragged thunderstorm", "thunderstorm with light drizzle", "thunderstorm with drizzle", "thunderstorm with heavy drizzle"]

const showerRainArray = ["light intensity drizzle", "drizzle", "heavy intensity drizzle", "light intensity drizzle rain", "drizzle rain", "heavy intensity drizzle rain", "shower rain and drizzle", "heavy shower rain and drizzle", "shower drizzle"];

const snowArray = ["light snow", "Snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "light shower snow", "shower snow", "heavy shower snow"]

const rainArray = ["light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain", "freezing rain", "light intensity shower rain", "shower rain", "heavy intensity shower rain", "ragged shower rain"]

let lat, lon;

async function fetchData() {
    let menu = document.getElementById('weather-main');
    while (menu.firstChild) {
        menu.removeChild(menu.firstChild);
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${key}`);

    if (!response.ok) {
        throw new Error("Could not fetch resources");
    }

    const data = await response.json();
    disName.innerHTML = data.name;
    cityTem.innerHTML = Math.floor(data.main.temp - 273);
    humidity.innerHTML = data.main.humidity;
    const len = data.weather.length;
    let i = 0;
    lat = data.coord.lat;
    lon = data.coord.lon;
    while (i < len) {
        const weaImg = document.createElement("img");
        const weaImgDiv = document.createElement("div");
        const weaDisc = document.createElement("div");
        const weaDiv = document.createElement("div");
        weaDiv.setAttribute("id", "weather-col");
        weaDisc.setAttribute("id", "weather-dis");
        weaImgDiv.setAttribute("id", "weather-img");

        weatherMain.appendChild(weaDiv);
        weaDiv.appendChild(weaDisc);
        weaDiv.appendChild(weaImgDiv);

        const w = data.weather[i].main.toLowerCase();
        weaDisc.innerHTML = data.weather[i].description.toLowerCase();

        if (w == "clear sky" || w == "clear") {
            weaImg.setAttribute('src', 'clear sky.png')
        } else if (w == "rain") {
            weaImg.setAttribute('src', 'rain.png')
        } else if (w == "few clouds") {
            
            weaImg.setAttribute('src', 'few clouds.png')
        } else if (w == "thunderstorm") {
            weaImg.setAttribute('src', 'thunderstorm.png')
        } else if (w == "broken clouds" || w == "clouds") {
            weaImg.setAttribute('src', 'broken clouds.png')
        } else if (w == "scattered clouds") {
            weaImg.setAttribute('src', 'scattered clouds.png')
        } else if (w == "shower rain") {
            weaImg.setAttribute('src', 'shower rain.png');
        } else if (w == "shower rain") {
            weaImg.setAttribute('src', 'shower rain.png');
        } else {
            weaImg.setAttribute('src', 'mist.png')
        }
        weaImg.alt = "no Image"
        weaImgDiv.appendChild(weaImg);
        i++;
    }
    console.log(data)

    const apiKey = 'ySBMa4m4B4Um9MdB+mLlKQ==TsgzMTxyv9crK2Ia';
    const url = `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`;

    const response2 = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'
        }
    });

    if (!response2.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data2 = await response2.json();
    // console.log(data2)
    currDate.innerHTML = data2.date;
    currTime.innerHTML = data2.datetime.slice(10)
    wd.style.display = 'flex'
}

