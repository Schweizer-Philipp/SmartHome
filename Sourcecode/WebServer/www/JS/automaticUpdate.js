import { createEntryActivityFeed} from './entry.js';

function allUpdates()
{
    ipAddress = document.querySelector('input[type="hidden"]').value;
    updateTemperature(ipAddress);
    updateActivityFeed(ipAddress)
}

function updateTemperature(ipAddress)
{
    var url = "http://"+ipAddress+":5400/temperatureAndHumidity";

    $.get(url)
        .done(function(response) {
            var basis = JSON.parse(response);
            console.log(basis);
        })
        .fail(function(response) {
          var basis = JSON.parse(response);
         
        }); 
}

function updateActivityFeed(ipAddress)
{
    var url = "http://"+ipAddress+":5400/activityfeed";

    $.get(url)
        .done(function(response) {
            var activityFeed = $('ul#activity-feed');
            var basis = JSON.parse(response);
            for(var i = basis.length-1; i>=0;i--)
            {
              activityFeed.prepend(createEntryActivityFeed(basis[i]['source'],basis[i]['button'],basis[i]['timestamp'],basis[i]['message']));
            }
        })
        .fail(function() {
          
        }); 
}

allUpdates();

window.setInterval("allUpdates()",60000*60);