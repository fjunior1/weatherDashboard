/*
Weather dashboard javascript functions
*/


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