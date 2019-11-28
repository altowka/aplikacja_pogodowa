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
        let output = '<h2 class="mb-4">Pogoda</h2>'
        let weatherData = data.main
         //   <ul class="list-group mb-3">
        //   </ul>
        
        for(let key in weatherData) {
            console.log(key, weatherData[key])
output += `
          <li class="list-group-item">${key}: ${weatherData[key]}</li>
        `
        if(key === "temp") {
            console.log('°') 
        }
        }

        weatherDiv.innerHTML = `<ul class="list-group mb-3">${output}</ul>`;
        console.log(data)
      })
    .catch((err) => {
        console.log(err)
        weatherDiv.innerHTML = err;
    })

}



towns.addEventListener('change', getPosts)