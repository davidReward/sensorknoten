angular.module('wettEditor').controller(
    'grafikCtrl',
    [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' ,  'sensorDataService',
        function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , sensorDataService) {



            $scope.stationList = null;
            $scope.sensorList = null;

            $scope.aktuelleStationId = $routeParams.stationId;
            $scope.aktuelleStationIdBool = false;

            $scope.aktuelleSensorId  = $routeParams.unitId;


            $scope.zeitRaumBool =false;

            $scope.loadAllStation = function() {
                sensorDataService.getAllStation().then(
                    function(response) {
                        $scope.stationList = response.data;
                        console.log($scope.stationList);
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
                console.log($scope.startDate);
                console.log($scope.endDate);

                startDate = ($filter('number')(($scope.startDate.getTime() / 1000), 0)).replace(/\./g, '');
                endDate = ($filter('number')(($scope.endDate.getTime() / 1000), 0)).replace(/\./g, '');

                sensorDataService.getSensorDataBetween($scope.aktuelleStationId,$scope.aktuelleSensorId,startDate,endDate).then(
                    function(response) {
                        $scope.sensorDataList = response.data;
                        createSensorData();
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
            $scope.changeSensor = function (unitID) {
                $scope.aktuelleSensorId = unitID;
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

            $scope.changeStartDate = function (startDate) {
                $scope.startDate = startDate;
            }
            $scope.changeEndDate = function (endDate) {
                $scope.endDate = endDate;
            }

            //Grafik
            $scope.showGrafik =function () {
                getSensorDataBetween();
            }

            createSensorData = function () {
                console.log($scope.dataTest);
                dataTest = {
                    name: '\'Station: ' + $scope.aktuelleStationId + ' Unit: ' + $scope.aktuelleSensorId + '\'',
                    data: []
                };
                angular.forEach($scope.sensorDataList.Messdaten, function(value, key){
                    console.log(value);
                    array1 = [];
                    array1.push( value.timestamp);
                    array1.push( parseFloat(($filter('number')(value.value, 1)).replace(/\,/g, '.')));
                    dataTest.data.push(array1);

                });
                $scope.dataTest = [];
                $scope.dataTest.push(dataTest);
                console.log($scope.dataTest);
            }


            $scope.options2 = {
                title: 'Sensor 1234',
                subtitle: 'SUbttitle 12',
                width: 900
            };

            $scope.dataTest = [{
                name: 'Winter 2012-2013',
                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: [
                    [Date.UTC(1970, 9, 21), 0],
                    [Date.UTC(1970, 10, 4), 0.28],
                    [Date.UTC(1970, 10, 9), 0.25],
                    [Date.UTC(1970, 10, 27), 0.2],
                    [Date.UTC(1970, 11, 2), 0.28],
                    [Date.UTC(1970, 11, 26), 0.28],
                    [Date.UTC(1970, 11, 29), 0.47],
                    [Date.UTC(1971, 0, 11), 0.79],
                    [Date.UTC(1971, 0, 26), 0.72],
                    [Date.UTC(1971, 1, 3), 1.02],
                    [Date.UTC(1971, 1, 11), 1.12],
                    [Date.UTC(1971, 1, 25), 1.2],
                    [Date.UTC(1971, 2, 11), 1.18],
                    [Date.UTC(1971, 3, 11), 1.19],
                    [Date.UTC(1971, 4, 1), 1.85],
                    [Date.UTC(1971, 4, 5), 2.22],
                    [Date.UTC(1971, 4, 19), 1.15],
                    [Date.UTC(1971, 5, 3), 0]
                ]
            }]


        } ]);
