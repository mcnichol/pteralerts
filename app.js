var express = require('express');
var app = express();
var port = process.env.PORT || 10203;

app.use(express.static(__dirname + '/public'));
app.use('/angular',express.static(__dirname + '/bower_components/angular'));

app.listen(port, function(){
    console.log("Running on: " + port);
});
