angular.module('wettEditor').service('sensorDataService',[ '$http', '$location' ,
															function($http , $location) {
    var srv = {};

    srv._baseUrl = $location.protocol() + '://' + $location.host() + ':' + '1100' + '/mdata';

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
    srv.getSensorDataBetween = function(stationId,unitId,startTimestamp,endTimestamp) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/station/" + stationId + '/' + unitId,
              params: {'begin': startTimestamp, 'end' : endTimestamp},
			  withCredentials: true,
			});
    };
    

    // Public API
    return {
        getSensorDataBetween: function(stationId,unitId,startTimestamp,endTimestamp) {
            return srv.getSensorDataBetween(stationId,unitId,startTimestamp,endTimestamp);
        },
    	getStationNow: function(stationId) {
            return srv.getStationNow(stationId);
        },
        getAllStation: function() {
            return srv.getAllStation();
        }  
    };
}]);