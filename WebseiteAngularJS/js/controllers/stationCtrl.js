angular.module('wettEditor').controller(
            'stationCtrl',
            [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' , '$uibModal', 'sensorDataService', 
                    function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , $uibModal, sensorDataService) {
            	
            	$scope.stationId = $routeParams.stationId;

            	$scope.sensorList = [];
				
            	//Vorlesung List laden
            	$scope.getStationNow = function() {
            		sensorDataService.getStationNow($routeParams.stationId).then(
							function(response) {
								$scope.sensorList = response.data;
							}, function(response) {
								alertService.add("warning", response.data.errorMessage);
							});
				};
				
				$scope.getStationNow($routeParams.stationId);
            	
	
								
						
} ]);



