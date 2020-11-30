const key = "73cfa05aa468e095076d7f42999784f7";
let recentCitesArr = JSON.parse(localStorage.getItem('recentCity')) || []
let mostRecentCity = recentCitesArr[0]
let userCityInput = mostRecentCity; // needs to be replaced with local storage last city
let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`;
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
let today = new Date().toLocaleDateString();

$("#today").text(today) // Displays the current date

//Executes search based from local storage.
function atStart(){
recentCitiesTableDisplay()
startSearch()
}

function startSearch(){
  userCityInput = $("#local0").text()
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  getWeatherData()
}

//Stores data to Local Storage.
function storeLocalData(cityAPIName){
  recentCitiesArr = JSON.parse(localStorage.getItem('recentCity')) || []
  if (recentCitiesArr.length > 6) recentCitesArr.pop();
  recentCitiesArr.unshift(cityAPIName.name)
  localStorage.setItem('recentCity', JSON.stringify(recentCitiesArr))
  console.log(cityAPIName.name)
}

// Updates HTML with local storage
function recentCitiesTableDisplay (){
  recentCites = JSON.parse(localStorage.getItem('recentCity'))
  $("#local0").text(recentCites[0])
  $("#local1").text(recentCites[1])
  $("#local2").text(recentCites[2])
  $("#local3").text(recentCites[3])
  $("#local4").text(recentCites[4])
  $("#local5").text(recentCites[5])
  console.log(recentCites)
  }


//Gets weather data
function getWeatherData(){
  $.ajax({
    url: currentWeatherURL,
    method: "GET"
  }).then(function(currentWeatherAPI) {
    console.log(currentWeatherAPI);
    
    let currentUvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentWeatherAPI.coord.lat}&lon=${currentWeatherAPI.coord.lon}&units=imperial&appid=${key}`
    let weatherIcon = currentWeatherAPI.weather[0].icon
    let imgURL = "https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png"

    storeLocalData(currentWeatherAPI)
    recentCitiesTableDisplay()

    // Displays API Current Weather in HTML
    $(".card-header").text(currentWeatherAPI.name)
    $(".main-temp").text("Temperature: " + currentWeatherAPI.main.temp + ('\xB0') + "F")
    $(".main-humidity").text("Humidity: " + currentWeatherAPI.main.humidity)
    $(".main-windspeed").text("Wind Speed: " + currentWeatherAPI.wind.speed)
    $("#weather-icon").html(`<img alt="Weather Icon" src=${imgURL}>`)
    $("#weather").text(currentWeatherAPI.weather[0].main)

    //Gets UV API Data
    $.ajax({
      url: currentUvURL,
      method: "GET"
    }).then(function getUvData(uvAPI) {

    // Displays UV Index to HTML
    let uvindex = uvAPI.value
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

//Gets Forecast API Data
$.ajax({
  url: forecastURL,
  method: "GET"
}).then(function(forecastAPI) {
console.log(forecastAPI)
//Grabs the date
let forecastDate1 = forecastAPI.list[0].dt_txt
let forecastDate2 = forecastAPI.list[8].dt_txt
let forecastDate3 = forecastAPI.list[16].dt_txt
let forecastDate4 = forecastAPI.list[24].dt_txt
let forecastDate5 = forecastAPI.list[32].dt_txt

//Grabs the weather icon needed
let forecastIcon1 = forecastAPI.list[0].weather[0].icon
let forecastIcon2 = forecastAPI.list[8].weather[0].icon
let forecastIcon3 = forecastAPI.list[16].weather[0].icon
let forecastIcon4 = forecastAPI.list[24].weather[0].icon
let forecastIcon5 = forecastAPI.list[32].weather[0].icon

//Creates Proper img URL
let iconUrl1 = "https://openweathermap.org/img/wn/"+ forecastIcon1 +"@2x.png";
let iconUrl2 = "https://openweathermap.org/img/wn/"+ forecastIcon2 +"@2x.png";
let iconUrl3 = "https://openweathermap.org/img/wn/"+ forecastIcon3 +"@2x.png";
let iconUrl4 = "https://openweathermap.org/img/wn/"+ forecastIcon4 +"@2x.png";
let iconUrl5 = "https://openweathermap.org/img/wn/"+ forecastIcon5 +"@2x.png";

//Displays the Date for each forecast
$("#date1").text(forecastDate1)
$("#date2").text(forecastDate2)
$("#date3").text(forecastDate3)
$("#date4").text(forecastDate4)
$("#date5").text(forecastDate5)

//Displays the Icon for each forecast day
$("#img1").html(`<img alt="Weather Icon" src=${iconUrl1}>`)
$("#img2").html(`<img alt="Weather Icon" src=${iconUrl2}>`)
$("#img3").html(`<img alt="Weather Icon" src=${iconUrl3}>`)
$("#img4").html(`<img alt="Weather Icon" src=${iconUrl4}>`)
$("#img5").html(`<img alt="Weather Icon" src=${iconUrl5}>`)

//Displays the Temperature for each forecast day
$(".forecast-temp1").text("Temp: " + forecastAPI.list[0].main.temp)
$(".forecast-temp2").text("Temp: " + forecastAPI.list[8].main.temp)
$(".forecast-temp3").text("Temp: " + forecastAPI.list[16].main.temp)
$(".forecast-temp4").text("Temp: " + forecastAPI.list[24].main.temp)
$(".forecast-temp5").text("Temp: " + forecastAPI.list[32].main.temp)

//Displays the Humidity for each forecast day
$(".forecast-hudmid1").text("Humidity: " + forecastAPI.list[0].main.humidity)
$(".forecast-hudmid2").text("Humidity: " + forecastAPI.list[8].main.humidity)
$(".forecast-hudmid3").text("Humidity: " + forecastAPI.list[16].main.humidity)
$(".forecast-hudmid4").text("Humidity: " + forecastAPI.list[24].main.humidity)
$(".forecast-hudmid5").text("Humidity: " + forecastAPI.list[32].main.humidity)

});
}

//Sets search value based on value in input
$("#search-button").on("click", function weatherSearch(){
  userCityInput = $("#search-value").val();
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  getWeatherData()
  
});

//Sets search value based on local storage
$("#local0").on("click", function (){
  userCityInput = $("#local0").text()
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  console.log(userCityInput)
  getWeatherData()
  
})
$("#local1").on("click", function (){
  userCityInput = $("#local1").text()
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  getWeatherData()
})
$("#local2").on("click", function (){
  userCityInput = $("#local2").text()
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  getWeatherData()
})
$("#local3").on("click", function (){
  userCityInput = $("#local3").text()
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  getWeatherData()
})
$("#local4").on("click", function (){
  userCityInput = $("#local4").text()
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  getWeatherData()
})
$("#local5").on("click", function (){
  userCityInput = $("#local5").text()
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=imperial&appid=${key}`
  forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&units=imperial&appid=${key}`;
  getWeatherData()
})

atStart()
