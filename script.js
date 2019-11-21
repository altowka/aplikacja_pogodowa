
let towns = document.getElementById("towns");

let cityName = towns.value;

function getPosts() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cc89fd42531d5a2498c425f76c416047`)
      .then((res) => res.json())
      .then((data) => {
    //     let output = '<h2 class="mb-4">Posts</h2>'
    //     data.forEach(post => {
    //       output += `
    //      <div class="card card-body mb-3">
    //      <h3>${post.title}</h3>
    //      <p>${post.body}</p>
    //      </div>
    //     `
    //     });
    //     document.getElementById('output').innerHTML = output;
    console.log(data)
      }
      )
  
  }

  getPosts()