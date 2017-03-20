   angular.module('wettEditor', ['ngRoute','ui.bootstrap', 'ngAnimate' , 'ngTouch'])
    	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/home',
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
	        .otherwise({
	            templateUrl: 'pages/404.html',
	        });
        
        	

	}]);