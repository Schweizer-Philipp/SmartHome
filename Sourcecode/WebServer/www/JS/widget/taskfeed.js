var taskfeed = 
{
    init: function()
    {
        const buttons = document.getElementsByClassName("smallButton");
    
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


taskfeed.init();