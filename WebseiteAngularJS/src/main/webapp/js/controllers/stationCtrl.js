angular.module('wettEditor').controller(
            'stationCtrl',
            [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' , '$interval', 'sensorDataService',
                    function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , $interval,  sensorDataService) {
            	
            	$scope.stationId = $routeParams.stationId;

            	$scope.sensorList = [];
				
            	//Station List laden
            	$scope.getStationNow = function() {
            		sensorDataService.getStationNow($routeParams.stationId).then(
							function(response) {
								$scope.sensorList = response.data;
							}, function(response) {
                                $rootScope.handlingError(response);
								alertService.add("warning", response.data.error);
							});
				};
				
				$scope.getStationNow($routeParams.stationId);

				$scope.refreshData = function () {
                    $scope.getStationNow($routeParams.stationId);
                }

				$scope.openGrafik = function(unitId){
                    $location.path('/grafik/' + $scope.stationId + '/' + unitId );
				}

				//Intervall
				$scope.stop = $interval(function() {
                    $scope.refreshData();
				}, 30000);

				var dereg = $rootScope.$on('$locationChangeSuccess', function() {
					$interval.cancel($scope.stop);
				});
	
								
						
} ]);



