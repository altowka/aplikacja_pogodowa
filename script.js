const towns = document.getElementById("towns");
const weatherDiv = document.getElementById("weather")
let cityName;

function getPosts(e) {
    cityName = e.target.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cc89fd42531d5a2498c425f76c416047`)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error("Podana nazwa miejscowości jest niewłaściwa. Spróbuj podać najbliższe większe miasto")
            }
        })
        .then((data) => {
            let output = `<h4 class="mb-4">Weather in ${cityName.charAt(0).toUpperCase() + cityName.slice(1)} city</h4>`
            let weatherData = data.main
            let wind = data.wind
            for (let key in weatherData) {
                output += `<li class="list-group-item">${key}: ${Math.round(Math.floor(weatherData[key]))}${addUnits(key)}<div  id="${key}" class="img"></div></li>`
            }
            for (let key in wind) {
                output += `<li class="list-group-item">wind-${key}: ${Math.round(Math.floor(wind[key]))}${addUnits(key)}<div  id="${key}" class="img"></div></li>`
            }

            weatherDiv.innerHTML = `<ul class="list-group mb-3">${output}</ul>`;
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
            weatherDiv.innerHTML = err;
        })

}


function addUnits(key) {
    switch (key) {
        case "temp":
        case "temp_min":
        case "temp_max":
            return "°";
            break;
        case "pressure":
            return "hpa";
            break;
        case "humidity":
            return "%";
            break;
        case "speed":
            return "m/s";
            break;
        case "deg":
            if (key >= 0 && key < 90) {
                return " (north)"
            } else if (key >= 90 && key < 180) {
                return " (east)"
            } else if (key >= 180 && key < 270) {
                return " (south)"
            } else {
                return " (west)"
            }
            break;
        default:
            return ""
    }
}

towns.addEventListener('change', getPosts)