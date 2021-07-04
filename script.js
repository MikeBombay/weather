const apiKey = "&appid=e788aa352fb3d4ecf2ce090225ef5c36";
const apiCity = "https://api.openweathermap.org/data/2.5/weather/?q="; 
const apiCoord = "https://api.openweathermap.org/data/2.5/onecall?";

var cities = [];
var searchtext;
let lat, long, date, icon, temp, uvi, humidity, wind_speed, city;




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




  function getForecast(searchtext) {
      fetch(apiCoord + "&lat=" + lat + "&lon=" + long + "&units=metric" + apiKey)
      .then(function(response){
          return response.json();
      }
      )
      .then(function(data){
      console.log(data);
    
    icon = data.current.weather[0].icon;
    //get date
    date = new Date().toLocaleDateString("en-US", {
      timeZone: `${data.timezone}`,
    });
    $("#city").html(
        `${searchtext.toUpperCase()}, ${date} <img src='http://openweathermap.org/img/w/${icon}.png'/>`
      );
      // set todays temp
      $("#temp").html(` ${data.current.temp} C`);
      // set wind
      $("#wind").html(` ${data.current.wind_speed} Kmh`);
      // set humidity
      $("#humidity").html(` ${data.current.humidity} %`);
      // set uv
      $("#uv").html(`UV Index: <span id="uvI">${data.current.uvi}</span>`);
      $("#uvI").css("background-color", bg);
      //clear previous 5 day forecast
      $(".dayCards").html("");
    
    
 })} ;


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


function fillCityList() {
    cities = JSON.parse(localStorage.getItem("citiesKey"));
    if (cities == null) cities = [];
    //limit length
    if (cities.length > 10) {
        cities.pop();
    };
    $("#cityList").html("");
    for (let i=0; i < cities.length; i++){
        $("#cityList").append(`<li id="${i}"class="list-group-item list-group-item-secondary text-center my-2 font-weight-bold mt-2">${cities[i]}</li>`)
    }};

    fillCityList();


//`<li id="${i}"class="list-group-item list-group-item-secondary text-center my-2 font-weight-bold mt-3">