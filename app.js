var express = require('express');
var app = express();
var port = process.env.PORT || 10203;

app.use('/',express.static(__dirname + '/public'));

app.listen(port, function(){
    console.log("Running on: " + port);
});
