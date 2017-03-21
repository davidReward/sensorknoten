angular.module('wettEditor').controller(
    'grafikCtrl',
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
                        alertService.add("warning", response.data.errorMessage);
                    });
            };

            $scope.loadAllStation();

            $scope.showAktuelleWerte = function(stationId) {
                $location.path('/stationen/' + stationId );
            };
        } ]);
