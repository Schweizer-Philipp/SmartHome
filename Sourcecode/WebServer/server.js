var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname+'/www'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(request, response) {
    response.sendFile(__dirname + '/www/LogIn.html');
});

app.post('/login', function(request, response){

    var username = request.body.username;
    var password = request.body.password;

    if(username == "admin" && password == "1234") {
        
	/*response.redirect('/dashboard');*/
	response.send("drin");
    } else {
        response.send("Wrong credentials...");
    }
});


app.get('/dashboard', function(request, response) {
    response.sendFile(__dirname + '/www/pages/dashboard.html');
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

app.listen(5400, function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('Server running...');
    }
});