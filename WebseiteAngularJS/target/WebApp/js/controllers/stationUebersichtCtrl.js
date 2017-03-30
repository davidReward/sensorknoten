angular.module('wettEditor').controller(
            'stationUebersichtCtrl',
            [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' , '$uibModal', 'sensorDataService',
                    function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , $uibModal, sensorDataService) {
            	

            	
            	$scope.stationList = 'Test';
				
            	//Vorlesung List laden
            	$scope.loadAllStation = function() {
					console.log('loadAllStation');
            		sensorDataService.getAllStation().then(
							function(response) {
								$scope.stationList = response.data;
							}, function(response) {
                                $rootScope.handlingError(response);
								alertService.add("warning", response.data.error);
							});
				};
				
				$scope.loadAllStation();
            	
				$scope.showAktuelleWerte = function(stationId) {
					 $location.path('/stationen/' + stationId );
				};
								
						
} ]);



