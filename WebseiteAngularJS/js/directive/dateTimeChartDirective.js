angular.module('wettEditor').directive('dateTimeChart',[ function () {
    return {
        restrict: 'EA',
        template: "<div></div>",
        scope: {
            options: '=',
            data: '='
        },
        link: function (scope, element, attrs) {
            scope.chartConfig = {
                chart: {
                    type: 'spline',
                    width: scope.options.width,
                    height: scope.options.height
                },

                title: {
                    text: scope.options.title
                },
                subtitle: {
                    text: scope.options.subtitle
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Snow depth (m)'
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
                },

                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                }
            };
            if (scope.options.jsonUrl != undefined) {
                ahcTimeDataWithIrregularIntervalsLineService.getData(scope.options.jsonUrl).success(function (data) {
                    scope.chartConfig.series = data;
                    scope.drawChart();
                });
            }
            else{
                scope.$watch('data', function (data) {
                    if (scope.chartConfig != undefined) {
                        scope.chartConfig.series = data;
                        scope.drawChart();
                    }
                });
            }

            scope.$watch('options.width', function (data) {
                if (scope.chartConfig != undefined) {
                    scope.chartConfig.chart.width = data;
                    scope.drawChart();
                }
            });

            scope.drawChart = function () {
                $(element).highcharts(scope.chartConfig);
            }

        }
    };
}]);
