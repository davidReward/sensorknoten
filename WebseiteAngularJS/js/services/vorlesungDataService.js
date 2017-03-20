angular.module('wettEditor').service('vorlesungDataService',[ '$http', '$location' ,
															function($http , $location) {
    var srv = {};

    srv._baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/resteffmanage/vorlesung';

    //new Vorlesung
    srv.newVorlesung = function(userId, vorlesung) {
		return $http({
			  method: 'POST',
			  url: srv._baseUrl + "/" ,
			  params: {'userId': userId},
			  data: vorlesung
			});
    };
    //get alle Noten 
    srv.getNotenList = function(userId, semesterId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/list/" +  semesterId + "/noten",
			  params: {'userId': userId}
			});
    };
    //get Vorlesung
    srv.getVorlesungById = function(userId, vorlesungId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/" +  vorlesungId,
			  params: {'userId': userId},
			});
    };
    //put Aufwand
    srv.putAufwand = function(userId, vorlesungId, aufwand) {
		return $http({
			  method: 'PUT',
			  url: srv._baseUrl + "/" + vorlesungId+ "/aufwand",
			  params: {'userId': userId},
			  data: aufwand
			});
    };
    //put Endnote
    srv.putEndnote = function(userId, vorlesungId, endNote) {
		return $http({
			  method: 'PUT',
			  url: srv._baseUrl + "/" + vorlesungId+ "/endnote",
			  params: {'userId': userId},
			  data: endNote
			});
    };
    //get Aufwand
    srv.getAufwandById = function(userId,vorlesungId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/" +  vorlesungId + "/aufwand",
			  params: {'userId': userId},
			});
    };  
    //get alle Vorlesung
    srv.getVorlesungList = function(userId,semesterId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/list/" +  semesterId,
			  params: {'userId': userId},
			});
    };
    
    
    // Public API
    return {
    	newVorlesung: function(userId, vorlesung) {
            return srv.newVorlesung(userId, vorlesung);
        },
        getNotenList: function(userId, semesterId) {
	        return srv.getNotenList(userId, semesterId);
	    },
	    getVorlesungById: function(userId, vorlesungId) {
            return srv.getVorlesungById(userId, vorlesungId);
        },
        putAufwand: function(userId, vorlesungId, aufwand) {
	        return srv.putAufwand(userId, vorlesungId, aufwand);
	    },
	    putEndnote: function(userId, vorlesungId, endNote) {
	        return srv.putEndnote(userId, vorlesungId, endNote);
	    },
	    getAufwandById: function(userId, vorlesungId) {
            return srv.getAufwandById(userId, vorlesungId);
        },
        getVorlesungList: function(userId, semesterId) {
            return srv.getVorlesungList(userId, semesterId);
        }
   
    };
}]);