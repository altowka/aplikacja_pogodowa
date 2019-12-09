window.addEventListener('load', function () {
    const towns = document.getElementById("towns");
    const weatherDiv = document.getElementById("weather");
    let image = document.getElementById("animated-img");
    let cityName;

    function getPosts(e) {
        cityName = e.target.value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cc89fd42531d5a2498c425f76c416047`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("The name provided is not valid. Please enter a different city name")
                }
            })
            .then((data) => {
                let output = `<h4 class="mb-4">Weather in ${cityName.charAt(0).toUpperCase() + cityName.slice(1)} city</h4>`
                let weatherData = data.main
                let wind = data.wind
                for (let key in weatherData) {
                    output += `<li class="list-group-item">${key}: ${Math.round(Math.floor(weatherData[key]))}${addUnits(key)}<div  id="${key}" class="img"></div></li>`
                    displayImages(weatherData, key);
                }
                for (let key in wind) {
                    output += `<li class="list-group-item">wind-${key}: ${Math.round(Math.floor(wind[key]))}${addUnits(key)}<div  id="${key}" class="img"></div></li>`
                }

                weatherDiv.innerHTML = `<ul class="list-group mb-3">${output}</ul>`;
                console.log(data);

            })
            .catch((err) => {
                console.log(err)
                weatherDiv.innerHTML = err;
                image.style.display = "none"
            })

    }

    function displayImages(object, key) {
        image.style.display = "block";
        image.style.animation = "fadeIn ease 5s"
        image.style.backgroundRepeat = "no-repeat";
        if (key === "temp") {
            if (object[key] > 15) {
                image.style.backgroundImage = "url('img/animations.jpg')"
                image.style.backgroundPosition = "0% -5%"
            } else if (object[key] > 2) {
                image.style.backgroundImage = "url('img/animations.jpg')"
                image.style.backgroundPosition = "0% 40%"

            } else if (object[key] > -2) { //średnia minka
                image.style.backgroundImage = "url('img/animations.jpg')"
                image.style.backgroundPosition = "50% 40%"

            } else {
                image.style.backgroundImage = "url('img/animations.jpg')"
                image.style.backgroundPosition = "53% 85%"

            }

        }
    }



    function addUnits(object, key) {
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
                if (object[key] >= 0 && object[key] < 90) {
                    return " (north)"
                } else if (object[key] >= 90 && object[key] < 180) {
                    return " (east)"
                } else if (object[key] >= 180 && object[key] < 270) {
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
    towns.addEventListener('change', () => {
        image.style.removeProperty("animation")
    })
})