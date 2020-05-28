import { createEntryActivityFeed, createEntryTaskFeed } from './entry.js';

function addTaskEntrys(tasks)
{
    var taskFeed = $('ul#task-feed');
    taskFeed.empty();
    tasks.sort((taskA, taskB) => (parseTimestampForCompare(taskA).localeCompare(parseTimestampForCompare(taskB)))*(-1));
    for(var i = 0;i < tasks.length;i++)
    {
        var task = JSON.parse(tasks[i]);
        taskFeed.prepend(createEntryTaskFeed(task['source'],task['button'],parseTimestampForUser(task['nextExecutionDay']),task['customName'],task['ID']));
    }
    
}

function addActivityEntrys(activitys)
{
    var activityFeed = $('ul#activity-feed');
    activityFeed.empty();
    for(var i = activitys.length-1; i>=0;i--)
    {
        activityFeed.prepend(createEntryActivityFeed(activitys[i]['source'],activitys[i]['button'],parseTimestampForUser(activitys[i]['timestamp']),activitys[i]['message']));
    }
}

function parseTimestampForCompare(task)
{
    var timestamp = JSON.parse(task)['nextExecutionDay'];
    return timestamp.replace(/[^0-9]/g, "");
}

function parseTimestampForUser(timestamp)
{
    var date = new Date(timestamp);

    console.log(date.getHours());

    return ("0" + date.getFullYear()).slice(-2) + "." +
    ("0" + (date.getMonth()+1)).slice(-2) + "." +
    date.getFullYear() + " um " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2)+" Uhr";
}

export { addTaskEntrys, addActivityEntrys };