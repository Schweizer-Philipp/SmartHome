import { updateActivityFeed } from './automaticUpdate.js';


window.onbeforeunload = function() {
   
    ipAddress = document.querySelector('input[type="hidden"]').value;
    var url = "http://"+ipAddress+":5400/deleteActivityfeed";
    $.ajax({
        url: url,
        type: 'DELETE'
    });
    updateActivityFeed(ipAddress);
    return null;
}