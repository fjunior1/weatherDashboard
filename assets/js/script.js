/*
Weather dashboard javascript functions
*/

let myKey = "25bdd42dbbe922a93923b851985199ef";
let city;
let cityList = ["orlando", "macon", "la vega", "samana"];

function init() {
    console.log("test test");
}

function getCitiesList() {
    debugger;
   let tmp = localStorage.getItem("cities");
    if (tmp === undefined) {
        return "";
    }

    return tmp;
}

cityList = getCitiesList();

function setCitiesList(cityList) {
    debugger;
    localStorage.setItem('cities', JSON.stringify(cityList));

}

setCitiesList(cityList);



function updateCityInfo(temp, wind, humid, uv) {
    $("#tempTxt").text("temp testJS");
    $("#windTxt").text("wind testJS");
    $("#humidTxt").text("humid testJS");
    $("#uvindexTxt").text("UV testJS");
}

updateCityInfo("", "", "", "");

function queryAPIInfo(city) {
    debugger;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
        + city + "&appid=" + myKey;
    
    /*fetch(queryURL);*/
    debugger;
    fetch(queryURL)
        .then(response => {
            debugger;
            response.json()
        })
        .then(data => {
            debugger;
            /* process returned object here */

            console.log(data);
            /* updateCityInfo()  */
        });
}

/*queryAPIInfo("chicago"); */
