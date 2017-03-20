angular.module('wettEditor').service('semesterDataService',[ '$http', '$location' ,
															function($http , $location) {
    var srv = {};

    srv._baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/resteffmanage';

    //get all Semester
    srv.getSemesterList = function(userId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/semester/",
			  params: {'userId': userId},
			});
    };
    //get Semester by semesterId
    srv.getSemesterById = function(userId, semesterId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/semester/" +  semesterId,
			  params: {'userId': userId},
			});
    };
    //delete a Semester
    srv.deleteSemester = function(userId, semesterId) {
		return $http({
			  method: 'DELETE',
			  url: srv._baseUrl + "/semester/" +  semesterId,
			  params: {'userId': userId},
			});
		
    };
    //change Semester
    srv.changeSemester = function(userId, semesterId, semester) {
		return $http({
			  method: 'PUT',
			  url: srv._baseUrl + "/semester/" +  semesterId,
			  params: {'userId': userId},
			  data: semester
			});
    };
    //new Semester
    srv.newSemester = function(userId,semester) {
		return $http({
			  method: 'POST',
			  url: srv._baseUrl + "/semester" ,
			  params: {'userId': userId},
			  data: semester
			});
    };    

    // Public API
    return {
    	getSemesterList: function(userId) {
            return srv.getSemesterList(userId);
        },
        getSemesterById: function(userId, semesterId) {
	        return srv.getSemesterById(userId, semesterId);
	    },
	    deleteSemester: function(userId, semesterId) {
            return srv.deleteSemester(userId, semesterId);
        },
        changeSemester: function(userId, semesterId, semester) {
	        return srv.changeSemester(userId, semesterId, semester);
	    },
	    newSemester: function(userId, semester) {
            return srv.newSemester(userId, semester);
        }
   
    };
}]);