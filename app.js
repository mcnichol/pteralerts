var express = require('express');
var app = express();
var request = require('request');

var port = process.env.PORT || 10203;
var token = process.env.TOKEN || 'NO_TOKEN_PROVIDED';
var baseUrl = process.env.PT_URL || 'https://www.pivotaltracker.com/services/v5';

var params ={
    'baseUrl' : baseUrl,
    'token' : token
};
//Static Routes
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));
app.use('/angular',express.static(__dirname + '/bower_components/angular'));
app.use('/angular-resource', express.static(__dirname + '/bower_components/angular-resource'));
app.use('/pteralerts', express.static(__dirname + '/src'));
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));

//REST API ROUTER Management
var apiRouter = require('./src/routes/apiRoutes')(params);
var notifyRouter = require('./src/routes/notifyRoutes')(params);

app.use('/api',apiRouter);
app.use('/notify',notifyRouter);

app.listen(port, function(){
    console.log("Running on: " + port);
});
