angular.module('pteralert',[])
.factory('pteralertApi', function(){
    var service = {};

    service.search = function(query){
        console.log(query);
        return {'projectdata' : 'somedata'};
    }
    return service;
})
