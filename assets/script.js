var searchHistory = []
var searchHistoryContainer = document.getElementById("#city-search");
var apiKey = "&appid=8cde0c178514f3d28c21cf8f9c44b5a6"
var weatherEl = document.getElementById("forcast-info");
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");
var card1EL = document.getElementById("1");
var card2EL = document.getElementById("2");
var card3EL = document.getElementById("3");
var card4EL = document.getElementById("4");
var card5EL = document.getElementById("5");


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
            fiveDay(data);
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
        //color code uv index as high, medium, low
        if (weather.current.uvi <= 2) {
            UVData.style.backgroundColor = "rgb(103, 169, 103)";
        }else if (weather.current.uvi <= 5) {
            UVData.style.backgroundColor = "rgb(251, 251, 167)";    
        }else {
            UVData.style.backgroundColor = "rgb(247, 105, 105)";
        };
}
//convert kelvin to fahrenheit
// var kelvinToFahrenheit = fucntion(temp){
//     1.8 * (('#temp')-273) + 32
// }

userFormEl.addEventListener("submit", formSubmitHandler);
// show 5 day forcast
var fiveDay = function(forcast) {
    var fiveTemp = forcast.daily
    for (let i=0; i<5; i++) {
        //run through each card to populate information
        let currentStepVar = "card" + [i + 1] +"EL";
        currentStepVar.textContent = fiveTemp[i].temp.max;
        console.log(currentStepVar);
    };
     

}
// save users searched cities
// function getsearch(search) {
//     searchHistoryContainer.innerHTML = "";
//     console.log(search);

//     for (let i=0; i<searchHistory.length; i++);
//         console.log("hello1");
//         var btn = document.createElement("button");
//         btn.textContent = searchHistory[i];
//         searchHistoryContainer.append("btn");
// };

// function appendToSearchHistory(search) {
//     console.log("hello2");
//     searchHistory.push(search);
//     localStorage.setItem("city-search",JSON.stringify(searchHistory));
// };

// getsearch();