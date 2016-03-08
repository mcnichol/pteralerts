angular.module('pteralert',[])
.factory('pteralertApi', function($http, $q){
    var service = {};
    var baseUrl = 'https://www.pivotaltracker.com/services/v5/';

    function httpRequest(req){
        var deferred = $q.defer();
        $http(req)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(){
                deferred.reject();
            });
        return deferred.promise;
    }

    service.getmynotifications = function(params){
        var req = {
            method: 'GET',
            url: baseUrl + 'my/notifications',
            data: {'envelope': true},
            headers: {
                'X-TrackerToken': params.token
            }
        };
        return httpRequest(req);
    };

    service.getme = function(params){
        var req = {
            method: 'GET',
            url: baseUrl + 'me',
            headers: {
                'X-TrackerToken': params.token
            }
        };
        return httpRequest(req);

    };
    return service;
});
