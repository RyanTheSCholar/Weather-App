// var cityNam;
// var statecode;
// var countrycode;

//     var card2 = document.createElement('section');
//     var card3 = document.createElement('section');
//     var card4 = document.createElement('section');
//     var card5 = document.createElement('section');

var inputValue = document.getElementById("query");
var searchButton = document.getElementById("SearchBtn");
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputValue + "&appid=" + APIKey;
var apiKey = "0fbf9f38a4fee52adb0650e9bcf0c085";

// potential fix for if for loop is giving me trouble use the &cnt-5 for five day forecast
// only issue with above is I dont know if the current day is included. so maybe ill have to use 6 instead of 5.

// first attempt at the fetch function

console.log(inputValue);
console.log(searchButton);
var clearButton = document.createElement("button");
var clearDiv = document.getElementById("clearbtn");
clearButton.setAttribute("id", "clear");
clearButton.textContent = "Clear";
clearDiv.appendChild(clearButton);
clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("citylist").innerHTML = "";
  localStorage.clear();
});

function searchCity(event) {
  event.preventDefault();
  var input = inputValue.value;
  getAPI(input);
}

function getAPI(input) {
  //   event.preventDefault();

  console.log(input);
  var storage = JSON.parse(localStorage.getItem("listOfCities")) || [];
  if (!storage.includes(input)) {
    storage.push(input);
  }

  document.getElementById("citylist").innerHTML = "";
  for (let index = 0; index < storage.length; index++) {
    var cityButton = document.createElement("button");
    var buttonDiv = document.getElementById("citylist");
    cityButton.setAttribute("id", "cities");
    cityButton.textContent = storage[index];
    cityButton.addEventListener("click", function () {
      getAPI(this.textContent);
    });
    buttonDiv.appendChild(cityButton);
  }
  localStorage.setItem("listOfCities", JSON.stringify(storage));
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input +
    "&appid=" +
    apiKey +
    "&units=imperial";
  console.log(queryURL);
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".bigcardinfo").innerHTML = "";
      var curTemp = data.main.temp;
      console.log(curTemp);
      var curWind = data.wind.speed;
      console.log(curWind);
      var curHumidity = data.main.humidity;
      console.log(curHumidity);
      var curWeatherIcon = data.weather[0].icon;
      console.log(curWeatherIcon);
      var curIconURL =
        "http://openweathermap.org/img/wn/" + curWeatherIcon + "@2x.png";

      var current = document.querySelector(".bigcardinfo");
      current.style.border = '1px solid black';
      var curIcon = document.createElement("img");
      curIcon.setAttribute("src", curIconURL);
      var temph2 = document.createElement("h2");
      var windh2 = document.createElement("h2");
      var humidityh2 = document.createElement("h2");
      var cityName = document.createElement("h1");

      cityName.textContent = input[0].toUpperCase() + input.slice(1);
      temph2.textContent = "Temp: " + curTemp + " °F";
      windh2.textContent = "Wind: " + curWind + " MPH";
      humidityh2.textContent = "Humidity: " + curHumidity + "%";

      current.appendChild(cityName);
      current.appendChild(curIcon);
      current.appendChild(temph2);
      current.appendChild(windh2);
      current.appendChild(humidityh2);

      // var titleOfForecast = document.querySelector('.forecastcards');
      // var forecasth2 = document.createElement('h2');
      // forecasth2.textContent = "5-Day Forecast:"
      // titleOfForecast.appendChild(forecasth2);

      // var current = document.querySelector('bigcardinfo')
      // current.textContent = data.main.temp;
      var queryURLNest =
        "https://api.openweathermap.org/data/2.5/forecast?" +
        "lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&appid=" +
        apiKey +
        "&units=imperial";
      console.log(queryURLNest);
      fetch(queryURLNest)
        .then(function (response) {
          return response.json();
        })
        .then(function (nestedData) {
          console.log(nestedData);
          document.querySelector(".container").innerHTML = "";
          document.querySelector('.daytitle').innerHTML ="";
          var titleOfForecast = document.querySelector(".daytitle");
          var forecasth2 = document.createElement("h2");
          forecasth2.textContent = "5-Day Forecast:";
          titleOfForecast.appendChild(forecasth2);
          //   var temperature = nestedData.list[0].main.temp;
          //   var windSpeed = nestedData.list[0].wind.speed;
          //   var humidityCity = nestedData.list[0].main.humidity;
          //   var fiveday = document.querySelector(".container");
          //   var card = document.createElement("section");
          //   card.setAttribute("class","card col-2");
          //   var temph2 = document.createElement("h2");
          //   var windh2 = document.createElement("h2");
          //   var humidityh2 = document.createElement("h2");
          //   fiveday.appendChild(card);
          //   card.appendChild(temph2);
          //   card.appendChild(windh2);
          //   card.appendChild(humidityh2);
          //   temph2.textContent = "Temp: " + temperature;
          //   windh2.textContent = "Wind Speed: " + windSpeed;
          //   humidityh2.textContent = "Humidity: " + humidityCity;
          for (var i = 0; i < nestedData.list.length; i += 8) {
            //    if(i === 40){
            //         i = 39
            // var temperature = nestedData.list[i].main.temp;
            // var windSpeed = nestedData.list[i].wind.speed;
            // var humidityCity = nestedData.list[i].main.humidity;
            // }

            var temperature = nestedData.list[i].main.temp;
            var windSpeed = nestedData.list[i].wind.speed;
            var humidityCity = nestedData.list[i].main.humidity;
            var weatherIcon = nestedData.list[i].weather[0].icon;
            var weatherDesc = nestedData.list[i].weather[0].description;
            var iconURL =
              "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            var dateText = nestedData.list[i].dt_txt.slice(0, 10);

            console.log(temperature);
            console.log(windSpeed);
            console.log(humidityCity);

            var fiveday = document.querySelector(".container");
            var card = document.createElement("section");
            card.setAttribute("class", "card col-2");
            var icon = document.createElement("img");
            icon.setAttribute("src", iconURL);
            var temph4 = document.createElement("h4");
            var windh4 = document.createElement("h4");
            var humidityh4 = document.createElement("h4");
            var dateForecast = document.createElement("h4");
            var weatherDescription = document.createElement("h4");

            fiveday.appendChild(card);
            card.appendChild(dateForecast);
            card.appendChild(icon);
            card.appendChild(weatherDescription);
            card.appendChild(temph4);
            card.appendChild(windh4);
            card.appendChild(humidityh4);

            dateForecast.textContent = dateText;
            icon.textContent = iconURL;
            weatherDescription.textContent = weatherDesc;
            temph4.textContent = "Temp: " + temperature + " °F";
            windh4.textContent = "Wind: " + windSpeed + " MPH";
            humidityh4.textContent = "Humidity: " + humidityCity + " %";
          }
        });

      // for (var i = 0; i > data.length; i++){
      //     console.log(data[i].main);

      // }
    });
}

// if (searchButton) {
//     console.log('asfdsafdas');
//
// }
searchButton.addEventListener("click", searchCity);
// GIVEN a weather dashboard with form inputs

// -----------------elements to create------------------
// add a header with weather dashboard on the top this not a dynamic creation.
// add a dynamicly made forecast of the day right below the header ------ new idea is to make the 5day forecast cards with javascript as well and then plug the information in via javascript.
// under this create a 5-day forecast
// create an aside bar for the search area
// create a list of cities ----these should be button elements---- these should have an event listener that connects to the dynamically created forecast-container

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// eventlistener needed for the search bar so that city searched gets pulled to the currentday and 5day forecast cards
// ideas for this have seperate data principals for the currentday and the 5day forecast
// on search would I shorten list to a single city and or just pull up the city to the main info area

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
