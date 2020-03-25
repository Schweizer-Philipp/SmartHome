var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var { PythonShell } = require('python-shell');
var taskManager = require('./taskManager');
var path = require('path');
const properties = require ("properties");
const ejs = require('ejs');

var app = express();

app.use(express.static(__dirname + '/www/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var specTaskManager = new taskManager();
specTaskManager.recoveryTasksFromFile();

var options = {
    scriptPath: __dirname + "/scripts/"
};

var config = {};
var activityfeed= [];


app.get('/', function (request, response) {
    response.render(path.resolve(__dirname, 'www/HTML/LogIn'), 
    {
        domain: config.domain
    });
});

app.post('/login', function (request, response) {

    var username = request.body.username;
    var password = request.body.password;

    if (username == "admin" && password == "1234") 
    {
        response.redirect('/dashboard');
    } else 
    {
        response.send("Wrong credentials...");
    }
});

app.get('/dashboard', function (request, response) {

    response.render(path.resolve(__dirname, 'www/HTML/dashboard'), 
    {
        domain: config.domain
    });
});

app.get('/activityfeed', function (request, response) {
    
    response.status(200).send(JSON.stringify(activityfeed));
});

app.delete('/deleteActivityfeed', function (request, response) {
    
    activityfeed = [];
    response.status(200);
});

app.post('/dashboard/:source/', function (request, response) {

    var button = ["BTN"].concat(Object.values(request.body)).join("_");
    
    var p = sendIrSignal(request.params.source, button);
    
    p.then(function () {
        response.status(200).send(JSON.stringify(activityfeed));
    }).catch(function (error) {
        response.status(500).send(JSON.stringify(activityfeed));
    });
    
});

app.post('/task', function (request, response) {

    var button = ["BTN"].concat(request.body["button"]).join("_");

    request.body["button"] = button;

    var message = specTaskManager.addNewTask(request.body, sendIrSignal);

    if (!(message.includes("Error"))) {
        response.status(200).send(JSON.stringify({
            message: message,
            allTasks: JSON.parse(specTaskManager.getAllTasks())
        }));
    }
    else {
        response.status(500).send(JSON.stringify({
            message: message,
            allTasks: JSON.parse(specTaskManager.getAllTasks())
        }));
    }
});

app.delete('/task/:taskid', function (request, response) {

    var message = specTaskManager.deleteTask(request.params.taskid);

    var code = !(message.includes("Error")) ? 200 : 500;

    response.status(code).send(JSON.stringify({
        message: message,
        allTasks: JSON.parse(specTaskManager.getAllTasks())
    }));
});

app.get('/allTasks', function (request, response) {
    response.status(200).send(JSON.stringify(
        JSON.parse(specTaskManager.getAllTasks())
    ));
});

app.get('/temperatureAndHumidity', function (request, response) {

    var pyshell = new PythonShell('read_Temperature_And_Humidity.py', options);
    pyshell.on('message', function (message) {
        var values = message.split(";", 2);
        response.status(200).send(JSON.stringify({
            data: {
                temperature: values[0],
                humidity: values[1]
            }
        }));
    });
});


function sendIrSignal(source, button) {
    return new Promise(function (resolve, reject) {
        
        options["args"] = [source];

        options["args"].push(button);

        var pyshell = new PythonShell('irTransmitter.py', options);

        pyshell.end(error => { 
            if(error) 
            {   
                console.log("Fehler");
                activity = {
                    source: source,
                    button: button,
                    timestamp: getTimeStamp(),
                    message: "Fehler beim irTransmitter script"
                };
                activityfeed.unshift(activity);
                reject("Fehler beim irTransmitter script"); 
            }
            else
            {
                activity = {
                    source: source,
                    button: button,
                    timestamp: getTimeStamp(),
                    message: "Ausführung Erfolgreich"
                };
                activityfeed.unshift(activity);
                resolve(); 
            }
        }); 
    });
}


function getTimeStamp() {

    var today = new Date();

    var timestamp = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear()+ ' um '+today.getHours() + ':' + today.getMinutes()+' Uhr';

    return timestamp
}

app.listen(5400, function (error) {

    var test = {
            cronTime: {
                min: "30",
                std: "14",
                dayOfTheMonth: "18,20",
                month: "*",
                weekdays: "*"
            },
            customName: "name",
            periode: "4",
            source: "test",
            button: "test1"
        };

    var test1 = {
        cronTime: {
            min: "30",
            std: "14",
            dayOfTheMonth: "18,20",
            month: "*",
            weekdays: "*"
        },
        customName: "name",
        periode: "5",
        source: "test",
        button: "test1"
    };
        
    
    //var id = specTaskManager.addNewTask(test);
    //console.log(id);
    /*console.log(specTaskManager.addNewTask(test));
    console.log(specTaskManager.deleteTask("test"));
    console.log(specTaskManager.deleteTask(id));
    console.log(specTaskManager.addNewTask(test));
    console.log(specTaskManager.addNewTask(test1));

    //specTaskManager.recoveryTasksFromFile(sendIrSignal);

    //console.log(JSON.stringify(specTaskManager));*/

    properties.parse ("config/file.properties", { path: true }, (error, obj) => {
        if (error) return console.error (error);    
        config = obj;
      });

    if (error) {
        console.log(error);
    } else {
        console.log('Server running...');
    }
});
