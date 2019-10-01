var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

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

app.post('/dashboard/:source/power', function(request, response){
    console.log("request incoming...");
    console.log(request.params.source);
    console.log("isActive: " + request.body.power);

    response.status(200).send(JSON.stringify({
        message: "creation successful",
        data: {
            title: "foo",
            timpestamp: "...."
        }
    }));
});

app.listen(5400, function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('Server running...');
    }
});