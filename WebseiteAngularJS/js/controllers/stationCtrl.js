angular.module('wettEditor').controller(
            'stationUebersichtCtrl',
            [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' , '$uibModal', 'sensorDataService', 'stationId',
                    function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , $uibModal, sensorDataService, stationId) {
            	

            	
            	$scope.sensorList = [];
				
            	//Vorlesung List laden
            	$scope.getStationNow = function() {
            		sensorDataService.getStationNow().then(
							function(response) {
								$scope.sensorList = response.data;
							}, function(response) {
								alertService.add("warning", response.data.errorMessage);
							});
				};
				
				$scope.getStationNow(stationId);
            	
	
								
						
} ]);



