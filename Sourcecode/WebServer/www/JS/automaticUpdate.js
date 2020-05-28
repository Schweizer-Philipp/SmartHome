import { addActivityEntrys, addTaskEntrys } from './addEntrys.js';

function allUpdates()
{
    console.log("da");
    ipAddress = document.querySelector('input[type="hidden"]').value;
    updateTemperature(ipAddress);
    updateActivityFeed(ipAddress);
    updateTaskFeed(ipAddress);
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
            var basis = JSON.parse(response);
            addActivityEntrys(basis);
        })
        .fail(function() {
          
        }); 
}

function updateTaskFeed(ipAddress)
{
    var url = "http://"+ipAddress+":5400/allTasks";
    
    $.get(url)
      .done(function(response) {
          var basis = JSON.parse(response);
          var tasks = basis['taskList'];
          addTaskEntrys(tasks);
          //alert(basis['message']);

      })
      .fail(function() {
        console.log("Error bei get allTasks");
      }); 
};

allUpdates();

window.setInterval(allUpdates,60000 * 20);

export {updateActivityFeed};