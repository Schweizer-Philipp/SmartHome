import { createEntryActivityFeed, createEntryTaskFeed } from './entry.js';

function init()
{
    //const buttons = document.getElementsByClassName("button");
    ipAddress = document.querySelector('input[type="hidden"]').value;
    var buttons = [];
    buttons = Array.prototype.concat.apply(buttons, document.getElementsByClassName("button"));
    buttons = Array.prototype.concat.apply(buttons, document.getElementsByClassName("button-large"));
    
    for(var i = 0; i<buttons.length;i++)
    {
        const button = buttons[i];
        button.addEventListener('click', function(){
          buttonHaptics(button);
          buttonSendLogic(button, ipAddress); 
        }.bind(this));
        button.addEventListener('contextmenu', function(ev) {
          ev.preventDefault();
          var min = "14";//prompt("Welche Minute");
          var std = "14";//prompt("Welche Stunde");
          var dayOfTheMonth = "14";//prompt("Welche Tage im Monat");
          var month = "*";//prompt("Welcher Monat");
          var weekays = "*";//prompt("Welche Wochentage");
          var customName = "Test";//prompt("Name für den Task");
          var periode = "2";//prompt("Periode")
          var source = button.getAttribute('data-source');
          var buttonName = button.getAttribute('data-button_name');
          var url = "http://"+ipAddress+":5400/task";
          var body = {
              cronTime: {
                min: min,
                std: std,
                dayOfTheMonth: dayOfTheMonth,
                month: month,
                weekdays: weekays
            },
            customName: customName,
            periode: periode,
            source: source,
            button: buttonName
          };
          $.post(url, body)
            .done(function(response) {
                console.log(response);
                var basis = JSON.parse(response);
                var taskFeed = $('ul#task-feed');
                var allTasks = basis['allTasks']['taskList'];
                taskFeed.empty();

                for(var i = 0;i < allTasks.length;i++)
                {
                    var task = JSON.parse(allTasks[i]);
                    taskFeed.prepend(createEntryTaskFeed(task['source'],task['button'],task['nextExecutionDay'],task['customName'],task['ID']));
                }
                //alert(basis['message']);

            })
            .fail(function(response) {
              var basis = JSON.parse(response.responseText);
              var taskFeed = $('ul#task-feed');
                var allTasks = basis['allTasks']['taskList'];
                taskFeed.empty();

                for(var i = 0;i < allTasks.length;i++)
                {
                    var task = JSON.parse(allTasks[i]);
                    taskFeed.prepend(createEntryTaskFeed(task['source'],task['button'],task['nextExecutionDay'],task['customName'],task['ID']));
                }
                alert(basis['message']);
            }); 

          return false;
      }, false);

    }
};
function buttonHaptics(button)
{  
    button.classList.add("active");
    
    setTimeout(function(){
      button.classList.remove("active");
    },250);
};
function buttonSendLogic(button, ipAddress) 
{
  var activityFeed = $('ul#activity-feed');
  var source = button.getAttribute('data-source');
  var buttonName = button.getAttribute('data-button_name');
  var url = "http://"+ipAddress+":5400/dashboard/"+source;

  var body = {
      buttonName: buttonName
  };
  $.post(url, body)
      .done(function(response) {
          var basis = JSON.parse(response);
          activityFeed.empty();
          for(var i = basis.length-1; i>=0;i--)
          {
              activityFeed.prepend(createEntryActivityFeed(basis[i]['source'],basis[i]['button'],basis[i]['timestamp'],basis[i]['message']));
          }
      })
      .fail(function(response) {
        var basis = JSON.parse(response);
        console.log(basis.length);
        for(var i = basis.length-1; i>=0;i--)
        {
            console.log(i);
            console.log(basis[i]);
            activityFeed.prepend(createEntryActivityFeed(basis[i]['source'],basis[i]['button'],basis[i]['timestamp'],basis[i]['message']));
        }
      }); 
};


init();
