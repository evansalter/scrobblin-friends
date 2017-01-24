var express = require('express');
var app = express();

const PORT = process.env.PORT || 8080;

app.get('/static/*', function(request, response){ 
     console.log('static file request : ' + request.params[0]);
     response.sendFile( __dirname + '/static/' + request.params[0]); 
});

app.get('*', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.listen(PORT);