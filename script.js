const cityName = document.getElementById("input-name");
const subButton = document.getElementById("submit-button");
const disName = document.getElementById("city-name");
const key = "e618835a3df8492eddcbb17f34146147";
const cityTem = document.getElementById("city-tem");
const cityWindSpeed = document.getElementById("city-wind");
const weatherMain = document.getElementById("weather-main")
const humidity = document.getElementById("city-hum")
const currDate = document.getElementById("date")
const currTime = document.getElementById("time")
const wd = document.getElementById("weatherd-display")

const elevenD = ["thunderstorm with light rain", "thunderstorm with rain", "light thunderstorm", "thunderstorm", "heavy thunderstorm", "ragged thunderstorm", "thunderstorm with light drizzle", "thunderstorm with drizzle", "thunderstorm with heavy drizzle"]

const nineD = ["light intensity drizzle", "drizzle", "heavy intensity drizzle", "heavy intensity drizzle rain", "drizzle rain", "heavy intensity drizzle rain", "shower rain and drizzle", "heavy shower rain and drizzle", "shower drizzle", "light intensity shower rain", "shower rain", "heavy intensity shower rain", "ragged shower rain"]

const tenD = ["light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain", "rain"]

const thirteenD = ["freezing rain","light snow", "Snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "light shower snow", "shower snow", "heavy shower snow"]

const fiftyD = ["mist", "smoke", "haze", "sand whirls", "dust whirls", "fog", "sand", "dust", "volcanic ash", "squalls", "tornado"]

const oneD = ["clear sky"]

const twoD = ["few clouds"]

const threeD = ["scattered clouds"]

const fourD = ["broken clouds", "overcast clouds"]

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
    cityWindSpeed.innerHTML = data.wind.speed;
    const len = data.weather.length;
    lat = data.coord.lat;
    lon = data.coord.lon;
    const url = `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`;
    const apiKey = 'ySBMa4m4B4Um9MdB+mLlKQ==TsgzMTxyv9crK2Ia';

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
    let i = 0;
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

        const w = data.weather[i].description.toLowerCase();
        weaDisc.innerHTML = data.weather[i].description.toLowerCase();

        if (oneD.includes(w)) {
            weaImg.setAttribute('src', 'oneDay.png')
        } else if (twoD.includes(w)) {
            weaImg.setAttribute('src', 'twoDay.png')
        } else if (threeD.includes(w)) {
            weaImg.setAttribute('src', 'threeDayNight.png')
        } else if (fourD.includes(w)) {
            weaImg.setAttribute('src', 'fourDayNight.png')
        } else if (nineD.includes(w)) {
            weaImg.setAttribute('src', 'nineDayNight.png')
        } else if (tenD.includes(w)) {
            weaImg.setAttribute('src', 'tenDay.png')
        } else if (elevenD.includes(w)) {
            weaImg.setAttribute('src', 'elevenDayNight.png');
        } else if (thirteenD.includes(w)) {
            weaImg.setAttribute('src', 'thirteenDayNight.png');
        } else {
            weaImg.setAttribute('src', 'fiftyDayNight.png')
        }
        weaImg.alt = "no Image"
        weaImgDiv.appendChild(weaImg);
        i++;
    }
    console.log(data)

    console.log(data2)
    currDate.innerHTML = data2.date;
    currTime.innerHTML = data2.datetime.slice(10)
    wd.style.display = 'flex'
}

