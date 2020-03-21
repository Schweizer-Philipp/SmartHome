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
        button.addEventListener('click', (function(){
          buttonHaptics(button);
          buttonSendLogic(button, ipAddress); 
        }).bind(this));
        button.addEventListener('contextmenu', function(ev) {
          ev.preventDefault();
          alert('success!');
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
