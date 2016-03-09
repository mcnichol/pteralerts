var express = require('express');
var notifyRouter = express.Router();

var router = function(params){
    var base_url = params.url || '';
    var token = params.token || '';
    var options = {
        url: base_url,
        headers:{
            'X-TrackerToken': token
        }
    };

    notifyRouter.route('/me')
        .get(function(req,res){
            if(options.headers['X-TrackerToken']){
                request(options,function(data){
                    res.send({
                        'type':'GET',
                        'data':data
                    });
                });
            }else{
                res.send({'type':'GET','err':'No Token Provided'});
            }
        });

    return notifyRouter;
};

module.exports = router;
