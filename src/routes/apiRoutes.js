var express = require('express');
var apiRouter = express.Router();
var request = require('request');

var router = function(params){
    var options = {
        headers:{
            'X-TrackerToken': params.token
        }
    };

    apiRouter.route('/me')
        .get(function(req,res){
            if(options.headers['X-TrackerToken'] !== 'NO_TOKEN_PROVIDED'){
                options.method = 'GET';
                options.url = params.baseUrl + '/me';
                request(options,function(err, data, body){
                    res.send({
                        'type':'GET',
                        'data':data,
                        'body':body
                    });
                });
            }
        });

    return apiRouter;
};

module.exports = router;
