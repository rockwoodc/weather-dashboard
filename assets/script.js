var searchHistory = []
var searchHistoryContainer = document.getElementById("#city-search");
var apiKey = "&appid=8cde0c178514f3d28c21cf8f9c44b5a6"
var weatherEl = document.getElementById("forecast-info");
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");
var fiveDayEL = document.getElementById("five-day-forecast");

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get city from input element
    var citySearch = cityInputEl.value.trim();
    if (citySearch) {
     getLocation(citySearch);
     checkHistory(citySearch);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city.")
    }
}

//create a function to check whether a searched city is in search history
function checkHistory(city){
    console.log(city);
    //check to see if there is a search history array in local storage
    if (localStorage.getItem("searchHistory")){
        searchHistory = localStorage.getItem("searchHistory");
        searchHistory = searchHistory.push(city);
        //check the array that comes back to see if the city already there
    }else{
        localStorage.setItem("searchHistory", searchHistory);

    }
    console.log(searchHistory);
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
    //display current date and place
    for (let i=0; i<1; i++) {
        //populate current date information
        var currentDateMilliseconds = weather.current.dt * 1000;
        var currentDate = new Date(currentDateMilliseconds);
        var readableCurrentDate = currentDate.toLocaleString();
        readableCurrentDate = readableCurrentDate.split(",");
        readableCurrentDate = readableCurrentDate[0];
        //append data to elements
        var CurrentDateEL = document.getElementById("currentPlace");
        CurrentDateEL.textContent = readableCurrentDate;

    }
    //parse out data for temp, humidity, wind speed, & uv index
    var tempData = document.getElementById("temp");    
    var tempF1 = weather.current.temp - 273.15;
    //finish out the equation to convert to F
    tempData.textContent = "Temp: " + Math.round(tempF1 * 1.8 + 32) + " F";
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

userFormEl.addEventListener("submit", formSubmitHandler);
// show 5 day forcast
var fiveDay = function(forecast) {
    var fiveTemp = forecast.daily
    console.log(fiveTemp);
    for (let i=1; i<6; i++) {
        //populate date information
        var dateMilliseconds = fiveTemp[i].dt * 1000;
        var dateObject = new Date(dateMilliseconds);
        var readableDate = dateObject.toLocaleString();
        readableDate = readableDate.split(",");
        readableDate = readableDate[0];

        //populate temp information & convert K to F
        var tempObject = fiveTemp[i].temp.max - 273.15;
        //finish out the equation to convert to F
        var tempF = "Temp: " + Math.round(tempObject * 1.8 + 32) + " F";

        //populate wind information
         var windObject = "Wind speed: " + fiveTemp[i].wind_speed + " MPH";

        //populate humidity information
         var humObject = "Humidity: " + fiveTemp[i].humidity + "%";

        //append data to elements
        var dateEL = document.createElement("h3");
        dateEL.innerText = readableDate;

        var tempEl = document.createElement("p");
        tempEl.innerText = tempF;

        var windEl = document.createElement("p")
        windEl.innerText = windObject;

        var humEl = document.createElement("p");
        humEl.innerText = humObject;

        //append elements to card
        var card = document.createElement("div");
        card.appendChild(dateEL);
        card.appendChild(tempEl);
        card.appendChild(windEl);
        card.appendChild(humEl);

        
        //add a class to our card element
        card.classList.add("forecastCards");    


        //append card to the dom
        fiveDayEL.append(card);
    };
}
// save users searched cities
// function getSearch(search) {
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

// getSearch();