/*
Weather dashboard javascript functions
*/

let myKey = "25bdd42dbbe922a93923b851985199ef";
let city;

function init() {
    console.log("test test");
}

init();

function getCitiesList() {
    
}

function setCitiesList(){

}

function updateCityInfo(temp, wind, humid, uv) {
    $("#tempTxt")[0].outerText = "temp testJS";
    $("#windTxt")[0].outerText =  "wind testJS";
    $("#humidTxt")[0].outerText = "humid testJS";
    $("#uvindexTxt")[0].outerText = "UV testJS";
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
