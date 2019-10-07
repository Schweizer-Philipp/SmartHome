var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var {PythonShell} = require('python-shell');

var app = express();

app.use(express.static(__dirname + '/www/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/www/HTML/LogIn.html');
});

app.post('/login', function(request, response){

    var username = request.body.username;
    var password = request.body.password;

    if(username == "admin" && password == "1234") {
        response.redirect('/dashboard');
    } else {
        response.send("Wrong credentials...");
    }
});

app.get('/dashboard', function(request, response){
    
	response.sendFile(__dirname + '/www/HTML/dashboard.html')
});


app.get('/dashboard/activityfeed', function(request, response){
    var activityFeedAsJson = {
        feeds: [
            {
                datasource: "Licht",
                title: "Licht wurde ausgeschalten",
                timestamp: "14:46:22 Uhr - 26.9.2019"
            },
            
            {
                datasource: "TV",
                title: "TV wurde ausgeschalten",
                timestamp: "14:46:22 Uhr - 26.9.2019"
            },
            
            {
                datasource: "PC",
                title: "Licht wurde ausgeschalten",
                timestamp: "14:46:22 Uhr - 26.9.2019"
            }
        ]
    };
    response.status(200).send(JSON.stringify(activityFeedAsJson));
});

app.post('/dashboard/:source/', function(request, response){
    
    console.log("request incoming...");
    console.log(request.params.source);

    var button = ["BTN"];
    for(var key in request.body) {
        button.push(request.body[key]);
    }
    button = button.join("_");

    var p = sendIrSignal(request.params.source, button);

    p.then(function(){
        console.log(p)
        console.log("Ich bin bei then");
        response.status(200).send(JSON.stringify({
            message: "IR Signal Erfolgreich gesendet, Button: " + button,
            data: {
                title: request.params.source,
                timestamp: getTimeStamp()
            }
        }));
    }).catch(function(error){
        console.log(p)
        console.log("Ich bin bei catch");
        response.status(500).send(JSON.stringify({
            message: "Serverfehler bitte den Admin kontaktieren, dieser wird sich dann an Robert wenden: " + error,
            data: {
                title: "Error",
                timestamp: getTimeStamp()
            }
        }));
    });
});



var options = {
    scriptPath: __dirname + "/scripts/"
};

function sendIrSignal(source, button) {
    return new Promise(function(resolve, reject){
        console.log("do something static");
        console.log("source is " + source);
        
        options["args"] =  [source];

        
        options["args"].push(button);

        console.log(options);
        
        var pyshell = new PythonShell('irTransmitter.py',options);
            
        pyshell.on('message', function (message) {
            console.log(message);
            if(message !=0) {
                
                console.log("ich bin bei reject");
                reject("Fehler beim irTransmitter script");
            }
            console.log("ich bin bei resolve");
            resolve();
        });
    });
}


function getTimeStamp(){

    var today = new Date();

    var timestamp = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' Uhr - ' + 
                    today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

    return timestamp
}

app.listen(5400, function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('Server running...');
    }
});
