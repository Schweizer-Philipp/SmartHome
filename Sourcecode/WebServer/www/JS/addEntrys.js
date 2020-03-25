import { createEntryActivityFeed, createEntryTaskFeed } from './entry.js';



function addTaskEntrys(tasks)
{
    var taskFeed = $('ul#task-feed');
    taskFeed.empty();
    tasks.sort((taskA, taskB) => (parseTaskForCompare(taskA).localeCompare(parseTaskForCompare(taskB)))*(-1));
    for(var i = 0;i < tasks.length;i++)
    {
        var task = JSON.parse(tasks[i]);
        taskFeed.prepend(createEntryTaskFeed(task['source'],task['button'],task['nextExecutionDay'],task['customName'],task['ID']));
    }
};

function addActivityEntrys(activitys)
{
    var activityFeed = $('ul#activity-feed');
    activityFeed.empty();
    for(var i = activitys.length-1; i>=0;i--)
    {
        activityFeed.prepend(createEntryActivityFeed(activitys[i]['source'],activitys[i]['button'],activitys[i]['timestamp'],activitys[i]['message']));
    }
};

function parseTaskForCompare(task)
{
    var timestamp = JSON.parse(task)['nextExecutionDay'];
    return timestamp.replace(/[^0-9]/g, "");
};

export { addTaskEntrys, addActivityEntrys };