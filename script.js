const apiKey = "&appid=e788aa352fb3d4ecf2ce090225ef5c36";
const apiCity = "https://api.openweathermap.org/data/2.5/weather/?q="; 
const apiCoord = "https://api.openweathermap.org/data/2.5/onecall?";

var cities = [];
var searchtext;
let lat, long, date, icon, temp, uvi, humidity, wind_speed, city, bgc, name;



//fetch 
function todayWeather(searchtext) {
    fetch(apiCity + searchtext + apiKey).then(function (response) {
      // request ok
      if (response.ok) {
        response.json().then(function (data) {
          //get lat/long for daily forecast
          console.log(data);
          lat = data.coord.lat;
          long = data.coord.lon;
          icon = data.weather[0].icon;
      
          //launch getForecast function
         getForecast(searchtext);
        });
      } else {
        // if not successful,  remove item from array/storage and redirect to homepage
        cities.shift();
        // send to storage
        localStorage.setItem("cities", JSON.stringify(searchtext));
        
        alert("sorry, try again");
        location.reload();
      }
    })
};


//

  function getForecast(searchtext) {
      fetch(apiCoord + "&lat=" + lat + "&lon=" + long + "&units=metric" + apiKey)
      .then(function(response){
          return response.json();
      }
      )
      .then(function(data){
      console.log(data);

    //if statements for UV bg color
    if (data.current.uvi <= 5) {
        bgc = "lightgreen";
      }
      if (data.current.uvi > 5) {
        bgc = "lightyellow";
      }
      if (data.current.uvi > 10) {
        bgc = "lightorange";
      }
     
    
    icon = data.current.weather[0].icon;
    //get date
    date = new Date().toLocaleDateString("en-US", {
      timeZone: `${data.timezone}`,
    });
    $("#city").html(
        `${searchtext.toUpperCase()}, ${date} <img src='http://openweathermap.org/img/w/${icon}.png'/>`
      );
      // today's weather conditions
      $("#temp").html(` ${data.current.temp} C`);
      $("#wind").html(` ${data.current.wind_speed} Km/h`);
      $("#humidity").html(` ${data.current.humidity} %`);
      $("#uv").html(`<span id="uvI"> ${data.current.uvi}</span>`);
      $("#uvI").css("background-color", bgc);
     //5 day weather conditions
      $(".5day").html("");
      for (let i = 1; i < 6; i++) {
        //get icon
        icon = data.daily[i].weather[0].icon;
        //convert date
        date = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US", {
          timeZone: `${data.timezone}`,
        });
      //append html
        $(".5day").append
        (`<div class="col-sm-2 bg-light mr-2">
        <p id="5Date0">${date}</p>
        <p id="5Img0"><img src='http://openweathermap.org/img/w/${icon}.png'/></p>
        <p>Temp: <span id="5Temp0"> ${data.daily[i].temp.day} C</span></p>
        <p>HumidX: <span id="5Humidity0">${data.daily[i].humidity} %</span></p>
        <p>Wind: <span id="5Wind0">${data.daily[i].wind_speed} </span>kmh</p>
        </div>`)}
    
 })} ;

//click for search and save city data to local storage in cities array
$("#searchBtn").on("click", function (){
    searchtext = $("#search").val();
    console.log(searchtext)
    if (cities.includes(searchtext)){

        todayWeather(searchtext);
    }
    else {
        cities.unshift(searchtext);
        localStorage.setItem("citiesKey", JSON.stringify(cities));
        todayWeather(searchtext);
    }
  
    fillCityList();

});

//populate list of cities from local storage limit to 8

function fillCityList() {
    cities = JSON.parse(localStorage.getItem("citiesKey"));
    if (cities == null) cities = [];
    //limit length
    if (cities.length > 8) {
        cities.pop();
    };
    $("#cityList").html("");
    for (let i=0; i < cities.length; i++){
        $("#cityList").append(`<li id="${i}"class="list-group-item list-group-item-secondary text-center my-2 font-weight-bold mt-2">${cities[i]}</li>`)
    }};

    fillCityList();


