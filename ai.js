// URL API cuaca (pastikan sesuai dengan API yang Anda gunakan)
const weatherAPI = "http://api.weatherapi.com/v1/forecast.json?key=254f59fbefef449ca37104752230310&days=5"; // Mengambil data cuaca untuk 5 hari

const keyword = document.querySelector(".keyword");
const btnSearch = document.querySelector(".btn-search");
const container = document.getElementById('container');

btnSearch.onclick = () => {
  fetch(`${weatherAPI}&q=${keyword.value}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      let element = '';
      element = showElements(data);
      container.innerHTML = element;
    });
};

function showElements(data) {
  const location = data.location;
  const current = data.current;
  const forecast = data.forecast.forecastday; // Data ramalan cuaca untuk beberapa hari
  
  let html = `
    <h3>${location.name}, ${location.region}, ${location.country}</h3>
    <div class="box">
      <img src="https:${current.condition.icon}" alt="">
      <h1>${current.temp_c} °C</h1>
    </div>
    <p>${current.last_updated}</p>
    <p>${current.condition.text}</p>
    <br><br>
    <h2>Weather forecast for the next few days:</h2>
  `;

  forecast.forEach(day => {
    html += `
      <div class="forecast-day">
        <h3>${day.date}</h3>
        <img src="https:${day.day.condition.icon}" alt="">
        <p>Max Temp: ${day.day.maxtemp_c} °C</p>
        <p>Min Temp: ${day.day.mintemp_c} °C</p>
        <p>${day.day.condition.text}</p>
      </div>
    `;
  });

  return html;
}
