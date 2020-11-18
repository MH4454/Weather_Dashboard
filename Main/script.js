let userCityInput = $("#search-value").val(); // needs to be replaced with local storage last city
const key = "73cfa05aa468e095076d7f42999784f7";

//Gets city by user input
$("#search-button").on("click", function(){
  let userCityInput = $("#search-value").val();
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCityInput + "&appid=" + key;
  userCityInput = $("#search-value").val();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

  
  
});

})
