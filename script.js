//this.is ok
let towns = document.getElementById("towns");
let cityName;

function getPosts(e) {
  cityName = e.target.value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cc89fd42531d5a2498c425f76c416047`)
  .then(resp => {
    if (resp.ok) {
        return resp.json()
    } else {
        throw new Error("Wystąpił błąd połączenia!")
    }
})
    .then((data) => {console.log(data.main)})
    .catch((err) => console.log(err))

}

towns.addEventListener('change', getPosts)