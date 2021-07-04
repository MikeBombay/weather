const key = "e788aa352fb3d4ecf2ce090225ef5c36";

var cities = [];
var searchtext;




$("#searchBtn").on("click", function (){
    searchtext = $("#search").val();
    console.log(searchtext)
    if (cities.includes(searchtext)){

        console.log("inArray")
    }
    else {
        cities.unshift(searchtext);
        localStorage.setItem("citiesKey", JSON.stringify(cities));
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
        $("#cityList").append(`<li id="${i}"class="list-group-item list-group-item-secondary text-center my-2 font-weight-bold mt-3">${cities[i]}</li>`)
    }};

    


//`<li id="${i}"class="list-group-item list-group-item-secondary text-center my-2 font-weight-bold mt-3">