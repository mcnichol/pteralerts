describe('ProjectCore', function() {
	var Projects;
	var $httpBackend;

	beforeEach(module('projectCore'));

	beforeEach(inject(function(_Projects_, _$httpBackend_) {
		Projects = _Projects_;
		$httpBackend = _$httpBackend_;
	}));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

	it('should create a project', function() {
        var expectedData = function(data){
            return angular.fromJson(data).projectId === '123';
        };

        $httpBackend.expectPOST(/./,expectedData)
            .respond(201);

        var project = new Projects({
            projectId: '123',
            name: 'projectName'
        });
        project.$save();

        expect($httpBackend.flush).not.toThrow();
	});

    it('should get project by id', function(){
        $httpBackend.expectGET('project/123')
            .respond(200);
        Projects.get({projectId: '123'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update a project', function(){
        $httpBackend.expectPUT('project')
            .respond(200);
        var project = new Projects({
            projectId: '123',
            name: 'projectName'
        });
        project.$update();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should authenticate requests', function(){
        var matchAny = /.*/;
        var headerData = function(headers){
            return angular.fromJson(headers)['X-TrackerToken'] === 'MY_PT_API_TOKEN';
        };

        $httpBackend.whenGET(matchAny,headerData)
            .respond(200);
        $httpBackend.expectPOST(matchAny, matchAny, headerData)
            .respond(200);
        $httpBackend.expectPUT(matchAny, matchAny, headerData)
            .respond(200);
        $httpBackend.expectDELETE(matchAny, headerData)
            .respond(200);

        var project = {projectId: '123', name: 'projectName'};
        Projects.query();
        Projects.get({ projectId: '123'});
        new Projects(project).$save();
        new Projects(project).$update();
        new Projects(project).$remove();

        expect($httpBackend.flush).not.toThrow();
    });
});

