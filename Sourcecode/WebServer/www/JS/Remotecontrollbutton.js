import { addActivityEntrys, addTaskEntrys } from './addEntrys.js';

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
          var min = prompt("Welche Minute");
          var std = prompt("Welche Stunde");
          var dayOfTheMonth = prompt("Welche Tage im Monat");
          var month = prompt("Welcher Monat");
          var weekays = prompt("Welche Wochentage");
          var customName = prompt("Name für den Task");
          var periode = prompt("Periode")
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
                var basis = JSON.parse(response);
                var tasks = basis['allTasks']['taskList'];
                addTaskEntrys(tasks);
                //alert(basis['message']);

            })
            .fail(function(response) {
              var basis = JSON.parse(response.responseText);
              
              var tasks = basis['allTasks']['taskList'];
              addTaskEntrys(tasks);
              alert(basis['message']);
            }); 

          return false;
      }, false);

    }
}
function buttonHaptics(button)
{  
    button.classList.add("active");
    
    setTimeout(function(){
      button.classList.remove("active");
    },250);
}
function buttonSendLogic(button, ipAddress) 
{
  var source = button.getAttribute('data-source');
  var buttonName = button.getAttribute('data-button_name');
  var url = "http://"+ipAddress+":5400/dashboard/"+source;

  var body = {
      buttonName: buttonName
  };
  $.post(url, body)
      .done(function(response) {
          var basis = JSON.parse(response);
	  console.log(basis);
          addActivityEntrys(basis);
      })
      .fail(function(response) {
        var basis = JSON.parse(response);
        addActivityEntrys(basis);
      }); 
}


init();
