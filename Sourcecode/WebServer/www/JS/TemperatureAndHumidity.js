function temperatureAndHumidity(){

    //var temperatureAndHumidity = document.getElementsByClassName("TemperatureAndHumidity");
    //temperatureAndHumidity[0].innerHTML = "";
    var url = "http://"+ipAddress+":5400/temperatureAndHumidity";

    $.get(url)
        .done( function(response) {
            var basis = JSON.parse(response);
            //temperatureAndHumidity[0].innerHTML = "Aktuelle Raumtemperatur: "+basis.data.temperature+"°<br> Aktuelle Luftfeuchtigkeit liegt bei: "+basis.data.humidity+"%";
            console.log(basis);
        })
        .fail(function(error) {
            //temperatureAndHumidity[0].innerHTML = "Fehler";
            console.log("fehler");
        });
}

temperatureAndHumidity();

window.setInterval("temperatureAndHumidity()",60000*60);