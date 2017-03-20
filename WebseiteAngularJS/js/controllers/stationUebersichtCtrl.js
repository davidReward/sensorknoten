angular.module('wettEditor').controller(
            'stationUebersichtCtrl',
            [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' , '$uibModal', 'sensorDataService',
                    function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , $uibModal, sensorDataService) {
            	

            	
            	$scope.stationList = [];
				
            	//Vorlesung List laden
            	$scope.loadAllStation = function() {
					console.log('loadAllStation');
            		sensorDataService.getAllStation().then(
							function(response) {
								$scope.stationList = response.data;
							}, function(response) {
								alertService.add("warning", response.data.errorMessage);
							});
				};
				
				$scope.loadAllStation();
            	
	
								
						
} ]);



