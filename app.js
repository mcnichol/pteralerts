var express = require('express');
var app = express();
var port = process.env.PORT || 10203;

app.get('/',function(req,res){
    res.send('Hello World');
});

app.listen(port, function(){
    console.log("Running on: " + port);
})
