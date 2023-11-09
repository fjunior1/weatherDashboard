/*
Weather dashboard javascript functions
*/

let myKey = "25bdd42dbbe922a93923b851985199ef";
let city;
let cityList = [];

function init() {
    console.log("test test");
}

function addCityButton(name) {
    let btn = $('<button>');
    btn.addClass('cityBtn');
    btn.text(name);

    $('#cityBtnList').append(btn);
}

function getCitiesList() {
    let tmp = JSON.parse(localStorage.getItem("cities"));
    if (tmp != null) {
        cityList = tmp;

        for (let i = 0; i < cityList.length; i++) {
            addCityButton(cityList[i]);
        }
    }

   // return tmp;
}

getCitiesList();

$('#searchBtn').click(function (event) {
    queryAPICityInfo($('#cityname').val());
})

$('.cityBtn').click(function (event) {
    queryAPICityInfo(event.target.innerText);
})

function setCitiesList(cityList) {
    localStorage.setItem('cities', JSON.stringify(cityList));
}

/* UV index ranges based on documentation: 
https://www.epa.gov/sites/production/files/documents/uviguide.pdf
*/
function setUvIndex(uv) {
    if (uv < 2 ) {
        $("#uvindexTxt").css("background-color", "green");
    } else if ((uv >= 2 ) && (uv <= 5 )) {
        $("#uvindexTxt").css("background-color", "gold");
    } else if ((uv > 5 ) && (uv <=7 )) {
        $("#uvindexTxt").css("background-color", "orange");
    } else if ((uv > 7 ) && (uv <= 10 )) {
        $("#uvindexTxt").css("background-color", "red");
    } else {
        $("#uvindexTxt").css("background-color", "purple");
    }
}

function displayCityInfo(data) {
    // update GUI with weather received
    // display current weather information
    //temp
    $('#tempTxt').text(data.current.temp + " °F");
    //icon
    data.current.weather[0].icon
    $('#fcimgToday' ).attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
    //wind
    $('#windTxt').text(data.current.wind_speed + " mph");
    //humidity
    $('#humidTxt').text(data.current.humidity + " %");
    //uv index
    $('#uvindexTxt').text(data.current.uvi);

    setUvIndex(data.current.uvi);
    // display 5 day forecast data
    for (let i = 0; i < 5; i++) {
        //date
        $('#dateTxt' + (i + 1)).text(moment().add(1 + i, "days").format("L"));
        //icon

        $('#fcimg' + (i + 1)).attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
        //temp
        $('#tempTxt' + (i + 1)).text(data.daily[i].temp.day + " °F");
        //wind
        $('#windTxt' + (i + 1)).text(data.daily[i].wind_speed + " mph");
        //humidity
        $('#humidTxt' + (i + 1)).text(data.daily[i].humidity + " %");
    }
}

function queryAPICityInfo(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
        + city + "&appid=" + myKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            /* process returned object here */
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let city = data.name;

            // update city buttons, list and save list.
            if (!cityList.includes(city)) {
                cityList.push(city);
                setCitiesList(cityList);
                addCityButton(city);
            }

            //update city and date
            $('#dateTxt').text(city + " (" + moment().format("L") + ")");

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + myKey
            ).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                displayCityInfo(data);
            });
        });
}
