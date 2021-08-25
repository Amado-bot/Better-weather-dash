let city = $("#searchValue").val();

let date = new Date();

$("#searchValue").keypress(function (event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $("#search-button").click();
    }
});

$("#search-button").on("click", function () {

    $('#fiveDay').addClass('show');
    city = $("#searchValue").val();
    $("#searchValue").val("");

    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=27be5eaf78baf6d8d8bf43cfd9dbb859";

    $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function (response) {
            callWeather(response);
            callForecast(response);
            createForecast();

        })
});

function createForecast() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}

function callWeather(response) {

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

}

function callForecast() {

    $.ajax({
        url:
            // "https://api.openweathermap.org/data/2.5/forecast?q=" + city + key
            "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=27be5eaf78baf6d8d8bf43cfd9dbb859",
        method: "GET"
    }).then(function (response) {
        $('#forecast').empty();

        let results = response.list;

        for (let i = 0; i < results.length; i++) {

            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

                let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                let tempF = Math.floor(temp);

                const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });

}