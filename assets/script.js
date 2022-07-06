var searchHistory = []
var searchHistoryContainer = document.querySelector("#city-search");
var apiKey = "&appid=8cde0c178514f3d28c21cf8f9c44b5a6"
var weatherEl = document.getElementById("forcast-info");
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get city from input element
    var citySearch = cityInputEl.value.trim();
    if (citySearch) {
     getLocation(citySearch);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city.")
    }
}

// uses the api to find all weather for city
var getLocation = function(city) {
    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    
    //make a request to url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){ 
        getWeather(data.coord);
        
        })   
    });
    };

//get lat and lon var and add them into the other api url
var getWeather = function (coord) {
    var long = coord.lon
    var lat = coord.lat
    var apiUrl= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + apiKey;
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){ 
            displayCurrent(data);
        })   
    });
}
var displayCurrent = function (weather){
    console.log(weather);
    //parse out data for temp, humidity, wind speed, & uv index
    var tempData = document.getElementById("temp");
    tempData.textContent = weather.current.temp + " K";
    var windData = document.getElementById("winds");
    windData.textContent = weather.current.wind_speed + " MPH";
    var humData = document.getElementById("humidity");
    humData.textContent = weather.current.humidity + " %";
    var UVData = document.getElementById("uv");
    UVData.textContent = weather.current.uvi;
}  

//color code uv index as high, medium, low

userFormEl.addEventListener("submit", formSubmitHandler);
// show 5 day forcast

// save users searched cities
// function getsearch() {
//     searchHistoryContainer.innerHTML = "";
//     console.log("hello");

//     for (let i=0; i<searchHistory.length; i++);
//         console.log("hello1");
//         var btn = document.createElement("button");
//         btn.textContent = searchHistory[i];
//         searchHistoryContainer.append("btn");
// };

// function appendToSearchHistory(search) {
//     console.log("hello2");
//     searchHistory.push(search);
//     localStorage.setItem("seach-history",JSON.stringify(searchHistory));
// };