   angular.module('wettEditor', ['ngRoute','ui.bootstrap', 'ngAnimate' , 'ngTouch' ])
    	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/stationen',
            })
            // route for the semester page
            .when('/stationen', {
                templateUrl : 'pages/stationList.html',
                controller  : 'stationUebersichtCtrl',
                activetab: 'stationen'
            })
            // route for the semester page
            .when('/stationen/:stationId', {
                templateUrl : 'pages/station.html',
                controller  : 'stationCtrl',
                activetab: 'stationen'
            })
            .when('/grafik', {
                templateUrl : 'pages/grafik.html',
                controller  : 'grafikCtrl',
                activetab: 'grafik'
            })
            .when('/grafik/:stationId/:unitId', {
                templateUrl : 'pages/grafik.html',
                controller  : 'grafikCtrl',
                activetab: 'grafik'
            })
	        .otherwise({
	            templateUrl: 'pages/404.html',
	        });
        
        	

	}]);