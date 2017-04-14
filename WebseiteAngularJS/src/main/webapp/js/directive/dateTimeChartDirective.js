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
                        text: 'Datum'
                    }
                },
                yAxis: {
                    title: {
                        text: scope.options.sensorName + ' ( '+ scope.options.einheit + ' )'
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b %H:%M}: {point.y:.2f}' + scope.options.einheit
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
                dateTimeChart.getData(scope.options.jsonUrl).success(function (data) {
                    scope.chartConfig.series = data;
                    scope.drawChart();
                });
            }
            else{
                scope.$watch('data', function (data) {
                    if (scope.chartConfig != undefined) {
                        scope.chartConfig.series = data;
                        scope.chartConfig.title.text = scope.options.title;
                        scope.chartConfig.subtitle.text = scope.options.subtitle;
                        scope.chartConfig.yAxis.title.text = scope.options.sensorName + ' ( '+ scope.options.einheit + ' )'
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
