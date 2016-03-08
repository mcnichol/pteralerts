describe('pivotal tracker service',function(){
    var ptMeData = {"kind":"me","id":10001,"name":"Frank Castle","initials":"FC","username":"fcastle","time_zone":{"kind":"time_zone","olson_name":"America/Los_Angeles","offset":"-08:00"},"api_token":"01234567890123456789012345678901","has_google_identity":false,"projects":[{"kind":"membership_summary","id":1,"project_id":1,"project_name":"Force Reconnaissance","project_color":"ac3f65","role":"member"},{"kind":"membership_summary","id":2,"project_id":2,"project_name":"Marine Corps","project_color":"ba6eff","role":"owner","last_viewed_at":"2016-02-17T18:23:16Z"},{"kind":"membership_summary","id":3,"project_id":3,"project_name":"Marvel Knights","project_color":"00a3d6","role":"owner","last_viewed_at":"2016-03-06T22:34:00Z"},{"kind":"membership_summary","id":4,"project_id":4,"project_name":"Code Red","project_color":"91a400","role":"member","last_viewed_at":"2016-02-24T17:51:02Z"}],"email":"fcastle@marvel.com","receives_in_app_notifications":true,"created_at":"2015-07-15T12:04:37Z","updated_at":"2016-03-07T04:27:15Z"};
    var ptMyNotificationData = {"last_notification_timestamp": 1455733466000,"http_status": "200","data": []};
    var pteralertApi = {};
    var $httpBackend;

    beforeEach(angular.mock.module('pteralert'));
    beforeEach(angular.mock.inject(function(_pteralertApi_, _$httpBackend_){
        pteralertApi = _pteralertApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return my notifications', function(){
        var response;
        var expectedUrl = /https:\/\/www.pivotaltracker.com\/\w+\/v[0-9]+\/my\/notifications/;

        $httpBackend.when('GET', expectedUrl)
            .respond(200, ptMyNotificationData);
         pteralertApi.getmynotifications('')
            .then(function(data){
                response = data;
            });
        $httpBackend.flush();

        expect(response.http_status).toEqual("200");
    });

    it('should return an error', function(){
        var response;
        $httpBackend.when('GET', 'https://www.pivotaltracker.com/services/v5/me')
            .respond(500);
        pteralertApi.getme('')
            .then(function(data){
                response = data;
            })
            .catch(function(){
                response = 'Error!';
            });
        $httpBackend.flush();
        expect(response).toEqual('Error!');
    });

    it('should return data me as the data kind', function(){
        var response;
        //Regex
        var expectedUrl = /https:\/\/www.pivotaltracker.com\/\w+\/v[0-9]+\/me/;

        $httpBackend.when('GET', expectedUrl)
            .respond(200, ptMeData);
         pteralertApi.getme('')
            .then(function(data){
                response = data;
            });

        $httpBackend.flush();
        expect(response.kind).toEqual('me');
    });
});
