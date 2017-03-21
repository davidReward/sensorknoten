angular.module('wettEditor').controller(
    'grafikCtrl',
    [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' ,  'sensorDataService',
        function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , sensorDataService) {



            $scope.stationList = null;
            $scope.sensorList = null;

            $scope.aktuelleStationId = $routeParams.stationId;
            $scope.aktuelleStationIdBool = false;

            $scope.aktuelleSensorId = $routeParams.unitId;

            $scope.zeitRaumBool =false;

            $scope.loadAllStation = function() {
                sensorDataService.getAllStation().then(
                    function(response) {
                        $scope.stationList = response.data;
                        if($scope.aktuelleStationId != undefined){
                            $scope.getStationNow($scope.aktuelleStationId);
                            $scope.aktuelleStationIdBool = true;
                        }else{
                            $scope.aktuelleStationIdBool = false;
                        }

                    }, function(response) {
                        alertService.add("warning", response.data.errorMessage);
                    });
            };

            $scope.getStationNow = function(stationId) {
                sensorDataService.getStationNow(stationId).then(
                    function(response) {
                        $scope.sensorList = response.data;
                        console.log($scope.sensorList)

                        if($scope.aktuelleSensorId != undefined){
                            $scope.zeitRaumBool = true ;
                        }else{
                            $scope.zeitRaumBool = false ;
                        }
                    }, function(response) {
                        alertService.add("warning", response.data.errorMessage);
                    });
            };

            getSensorDataBetween = function() {
                console.log($scope.aktuelleSensorId);
                sensorDataService.getSensorDataBetween($scope.aktuelleStationId,$scope.aktuelleSensorId,$scope.startDate,$scope.endDate).then(
                    function(response) {
                        $scope.sensorDataList = response.data;
                        console.log($scope.sensorDataList)
                    }, function(response) {
                        alertService.add("warning", response.data.errorMessage);
                    });
            };

            $scope.loadAllStation();

            $scope.showAktuelleWerte = function(stationId) {
                $location.path('/stationen/' + stationId );
            };

            $scope.changeStation = function () {
                $scope.getStationNow($scope.aktuelleStationId);
                $scope.aktuelleStationIdBool = true;
            }
            $scope.changeSensor = function () {
                console.log($scope.aktuelleSensorId);
                $scope.zeitRaumBool = true ;
            }

            //DATUM auswaehlen
            $scope.startDate = new Date();
            $scope.endDate = new Date();



            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };
            $scope.popup1 = {
                opened: false
            };
            $scope.dateOptions1 = {
                formatYear: 'yy',
                maxDate: $scope.startDate,
                startingDay: 1
            };
            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };
            $scope.popup2 = {
                opened: false
            };
            $scope.dateOptions2 = {
                formatYear: 'yy',
                minDate: $scope.endDate,
                startingDay: 1
            };

            $scope.sensorDataList = null;

            //Grafik
            $scope.showGrafik =function () {
                getSensorDataBetween();
            }



        } ]);
