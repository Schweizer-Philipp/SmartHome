

var remotecontroll = 
{
    init: function()
    {
        //const buttons = document.getElementsByClassName("button");
        var buttons = [];
        buttons = Array.prototype.concat.apply(buttons, document.getElementsByClassName("button"));
        buttons = Array.prototype.concat.apply(buttons, document.getElementsByClassName("button-large"));
    
        for(var i = 0; i<buttons.length;i++)
        {
          const button = buttons[i];
          button.addEventListener("click",function(){
            
            button.classList.add("active");
            setTimeout(function(){
              button.classList.remove("active");
            },250);
          });
        }
    },
}


remotecontroll.init();

