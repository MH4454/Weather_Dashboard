// Displays the current date
let today = new Date().toLocaleDateString();
$("#today").text(today)
// Gets the user city input, if not entered yet then grabs from local storage.
let userCityInput = $("#search-value").val(); // needs to be replaced with local storage last city
const key = "73cfa05aa468e095076d7f42999784f7";

//Gets city by user input
$("#search-button").on("click", function(){
  userCityInput = $("#search-value").val();
  let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`;
  let forcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`




  $.ajax({
    url: currentWeatherURL,
    method: "GET"
  }).then(function(response) {
    //console.log(response);
    $(".card-header").text(response.name)
    $(".main-temp").text("Temperature: " + response.main.temp + ('\xB0') + "F")
    $(".main-humidity").text("Humidity: " + response.main.humidity)
    $(".main-windspeed").text("Wind Speed: " + response.wind.speed)
    let currentUvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&appid=${key}`
    let weatherIcon = response.weather[0].icon
    let imgURL = "https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png"
    $("#weather-icon").html(`<img alt="Weather Icon" src=${imgURL}>`)


    $.ajax({
      url: currentUvURL,
      method: "GET"
    }).then(function(response) {
    //console.log(response)

    let uvindex = response.value
    $(".main-uvindex").text("UV Index: " + uvindex)
    if (uvindex <= 2){
      $("#uv-access").css("background-color", "chartreuse")
    } else if (uvindex <= 5){
      $("#uv-access").css("background-color", "yellow")
    } else if (uvindex <= 7){
      $("#uv-access").css("background-color", "orange")
      $("#uv-access").append(" Wear Sunscreen")
    } else if (uvindex <= 10){
      $("#uv-access").css("background-color", "red")
      $("#uv-access").append(" Stay out of the sun")
    } else {
      $("#uv-access").css("background-color", "violet")
      $("#uv-access").append(" Stay Inside!")
  }
  });
    


});

$.ajax({
  url: forcastURL,
  method: "GET"
}).then(function(response) {
console.log(response)
let forcastDate1 = response.list[0].dt_txt
let forcastDate2 = response.list[0].dt_txt
let forcastDate3 = response.list[0].dt_txt
let forcastDate4 = response.list[0].dt_txt
let forcastDate5 = response.list[0].dt_txt

let forcastIcon1 = response.list[0].weather[0].icon
let forcastIcon2 = response.list[8].weather[0].icon
let forcastIcon3 = response.list[16].weather[0].icon
let forcastIcon4 = response.list[24].weather[0].icon
let forcastIcon5 = response.list[32].weather[0].icon

let iconUrl1 = "https://openweathermap.org/img/wn/"+ forcastIcon1 +"@2x.png";
let iconUrl2 = "https://openweathermap.org/img/wn/"+ forcastIcon2 +"@2x.png";
let iconUrl3 = "https://openweathermap.org/img/wn/"+ forcastIcon3 +"@2x.png";
let iconUrl4 = "https://openweathermap.org/img/wn/"+ forcastIcon4 +"@2x.png";
let iconUrl5 = "https://openweathermap.org/img/wn/"+ forcastIcon5 +"@2x.png";

$("#date1").text(forcastDate1)
$("#date2").text(forcastDate2)
$("#date3").text(forcastDate3)
$("#date4").text(forcastDate4)
$("#date5").text(forcastDate5)

$("#img1").html(`<img alt="Weather Icon" src=${iconUrl1}>`)
$("#img2").html(`<img alt="Weather Icon" src=${iconUrl2}>`)
$("#img3").html(`<img alt="Weather Icon" src=${iconUrl3}>`)
$("#img4").html(`<img alt="Weather Icon" src=${iconUrl4}>`)
$("#img5").html(`<img alt="Weather Icon" src=${iconUrl5}>`)

$(".forcast-temp1").text("Temp: " + response.list[0].main.temp)
$(".forcast-temp2").text("Temp: " + response.list[8].main.temp)
$(".forcast-temp3").text("Temp: " + response.list[16].main.temp)
$(".forcast-temp4").text("Temp: " + response.list[24].main.temp)
$(".forcast-temp5").text("Temp: " + response.list[32].main.temp)

$(".forcast-hudmid1").text("Humidity: " + response.list[0].main.humidity)
$(".forcast-hudmid2").text("Humidity: " + response.list[8].main.humidity)
$(".forcast-hudmid3").text("Humidity: " + response.list[16].main.humidity)
$(".forcast-hudmid4").text("Humidity: " + response.list[24].main.humidity)
$(".forcast-hudmid5").text("Humidity: " + response.list[32].main.humidity)

});

})
