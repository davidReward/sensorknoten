angular.module('wettEditor').service('sensorDataService',[ '$http', '$location' ,
															function($http , $location) {
    var srv = {};

    srv._baseUrl = $location.protocol() + '://' + $location.host() + ':' + '5000' + '/mdata';

    //get User
    srv.getAllStation = function() {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/station",
			  withCredentials: true,
			});
    };
    srv.getStationNow = function(stationId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/station/" + stationId,
			  withCredentials: true,
			});
    };
    

    // Public API
    return {
    	getStationNow: function(stationId) {
            return srv.getStationNow(stationId);
        },
        getAllStation: function() {
            return srv.getAllStation();
        }  
    };
}]);