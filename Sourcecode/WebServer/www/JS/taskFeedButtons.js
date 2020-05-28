import { addTaskEntrys,addActivityEntrys } from './addEntrys.js';

function haptic(action, ID, button)
{
    button.classList.add("active");
    setTimeout(function(){
        button.classList.remove("active");
    },250);
    action(ID);
}

function executeButton(ID)
{
    var url = "http://"+ipAddress+":5400/dashboard/task/"+ID;

    $.post(url)
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

function deleteButton(ID)
{
    ipAddress = document.querySelector('input[type="hidden"]').value;

    var url = "http://"+ipAddress+":5400/task/"+ID;

    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(response) {
            var basis = JSON.parse(response);
            var tasks = basis['allTasks']['taskList'];
            addTaskEntrys(tasks);
        }
    });
}

function showMoreButton(ID)
{
    console.log(ID);
}

export{ haptic, executeButton, deleteButton, showMoreButton  };