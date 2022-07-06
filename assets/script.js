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
        console.log(citySearch);
    if (citySearch) {
        getWeather(citySearch);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city.")
    }
    console.log(event);
}
//use this api url to test the function
// var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=richmond&appid=8cde0c178514f3d28c21cf8f9c44b5a6"

// uses the api to find all weather for city
var getWeather = function() {
    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + apiKey;
    //get lat and lon var and add them into the other api??

    //make a request to url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
        console.log(data.main.humidity);      
        })
       
    });

    //   //used to display HTML
    //   var weatherData = data.main.temp;
    //   for(var i = 0; i < weatherData; i++);
    //       var tempData = document.createElement("li");
    //       tempData.textContent = weatherData[i].temp;
    //       weatherEl.appendChild(tempData);
            
        

    };
    //parse out data for temp, humidity, wind speed, & uv index
userFormEl.addEventListener("submit", formSubmitHandler);
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