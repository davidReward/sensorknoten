angular.module('wettEditor').controller(
    'grafikCtrl',
    [ '$rootScope', '$scope', '$location', '$routeParams' ,'$filter','$http', '$window', 'alertService' ,  'sensorDataService',
        function($rootScope, $scope, $location, $routeParams, $filter, $http, $window , alertService , sensorDataService) {



            $scope.stationList = null;
            $scope.sensorList = null;

            $scope.aktuelleStationId = $routeParams.stationId;
            $scope.aktuelleStationIdBool = false;

            $scope.aktuelleSensorId = undefined;



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
                        alertService.add("warning", response.data.error);
                    });
            };

            $scope.getStationNow = function(stationId) {
                sensorDataService.getStationNow(stationId).then(
                    function(response) {
                        $scope.sensorList = response.data;
                        setAktuelleUnitId()
                        if($scope.aktuelleSensorId != undefined){
                            $scope.zeitRaumBool = true ;
                        }else{
                            $scope.zeitRaumBool = false ;

                        }





                    }, function(response) {
                        alertService.add("warning", response.data.error);
                    });
            };

            setAktuelleUnitId = function () {
                angular.forEach($scope.sensorList.Messdaten, function(value, key) {
                    if($routeParams.unitId == value.unit){
                        console.log('Settet: ' + value.unit)
                        $scope.aktuelleSensorId = value.unit;
                    }
                })
            }

            getSensorDataBetween = function() {
                startDate = ($filter('number')(($scope.startDate.getTime() / 1000), 0)).replace(/\./g, '');
                endDate = ($filter('number')(($scope.endDate.getTime() / 1000), 0)).replace(/\./g, '');

                einheit_t = 'Error';
                sensorName_t = 'Error'

                angular.forEach($scope.sensorList.Messdaten, function(value, key) {
                    if($scope.aktuelleSensorId == value.unit){
                        einheit_t = value.unit_name;
                        sensorName_t = value.sensor;
                    }
                })

                $scope.options2 = {
                    title: 'StationId: ' + $scope.aktuelleStationId,
                    subtitle: sensorName_t,
                    width: 1100,
                    einheit: einheit_t,
                    sensorName: sensorName_t
                };

                sensorDataService.getSensorDataBetween($scope.aktuelleStationId,$scope.aktuelleSensorId,startDate,endDate).then(
                    function(response) {
                        $scope.sensorDataList = response.data;
                        createSensorData();
                    }, function(response) {
                        alertService.add("warning", response.data.error);
                    });
            };

            $scope.loadAllStation();

            $scope.showAktuelleWerte = function(stationId) {
                $location.path('/stationen/' + stationId );
            };

            $scope.changeStation = function () {
                $routeParams.unitId = $scope.aktuelleStationId
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
                $scope.showGrafikBool = true;

            }
            $scope.showGrafikBool = false;

            createSensorData = function () {
                dataTest = {
                    name: '\'Station: ' + $scope.aktuelleStationId + ' Unit: ' + $scope.aktuelleSensorId + '\'',
                    data: []
                };
                angular.forEach($scope.sensorDataList.Messdaten, function(value, key){

                    if(value.value != null){
                        array1 = [];
                        array1.push( value.timestamp * 1000);
                        array1.push( parseFloat((($filter('number')(value.value, 1)).replace(/\,/g, '.')).replace(/\./g, ','))) ;
                        dataTest.data.push(array1);
                    }
                });
                $scope.dataTest = [];
                $scope.dataTest.push(dataTest);

            }

  /*          $scope.options2 = {
                title: 'Station: ' + $scope.aktuelleStationId,
                subtitle: 'Unit: ' + $scope.aktuelleSensorId ,
                width: 900
            };
*/

            $scope.dataTest = [];


        } ]);
