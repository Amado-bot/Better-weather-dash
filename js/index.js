let city = $("#searchValue").val();

const key = "27be5eaf78baf6d8d8bf43cfd9dbb859"

$("#searchValue").keypress(function(event){
    if (event.keycode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

$("#searchBtn").on("click", function(){
    $("#fiveDay").addClass("show");
    $("#searchValue").val("");

    const apiQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: apiQuery,
        method: "GET"
    })
    
    })
});