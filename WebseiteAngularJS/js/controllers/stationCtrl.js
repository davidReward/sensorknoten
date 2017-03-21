angular.module('wettEditor').controller(
            'stationCtrl',
            [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' , '$interval', 'sensorDataService',
                    function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , $interval,  sensorDataService) {
            	
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

				$scope.refreshData = function () {
                    $scope.getStationNow($routeParams.stationId);
                }

				$scope.openGrafik = function(unitId){
                    $location.path('/grafik/' + $scope.stationId + '/' + unitId );
				}

				$interval(function() {
                    $scope.refreshData();
				}, 30000);
	
								
						
} ]);



