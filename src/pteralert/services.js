angular.module('pteralert',[])
.factory('pteralertApi', function($http, $q){
    var service = {};
    var baseUrl = 'https://www.pivotaltracker.com/services/v5/';

    service.getmynotifications = function(query){
        var deferred = $q.defer();
        $http.get(baseUrl + 'my/notifications')
            .success(function(data){
                deferred.resolve(data);
            });
        return deferred.promise;
    };

    service.getme = function(query){
        var deferred = $q.defer();
        $http.get(baseUrl + 'me')
            .success(function(data){
                deferred.resolve(data);
            });
        return deferred.promise;
    };
    return service;
});
