var cityInput = document.querySelector("#city-name")
var searchHistory = []
var searchHistoryContainer = document.querySelector("#city-search");
var apiKey = "&appid=8cde0c178514f3d28c21cf8f9c44b5a6"
var weatherEl = document.getElementById("weather-info");
// var lat =
// var lon =
// var temp = 
// var humidity =
// var windSpeed =
// var uvIndex =

// allows input of city name to be added to the url
// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;
//get lat and lon var and add them into the other api

//use this api url to test the function
// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=richmond&appid=8cde0c178514f3d28c21cf8f9c44b5a6"
// uses the api to find all weather for city
var getWeather = function() {
    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + apiKey;

    //make a request to url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
        console.log(data);      
        })
    });//         //used to display HTML
    //         console.log(data);
    //         var weatherData = data.temp;
    //         for(var i = 0; i < weatherData; i++);
    //             var tempData = document.createElement("li");
    //             tempData.textContent = weatherData[i].temp;
    //             weatherEl.appendChild(tempData);
    //     });

    };
    //parse out data for temp, humidity, wind speed, & uv index
getWeather();
//show 5 day forcast

//save users searched cities
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