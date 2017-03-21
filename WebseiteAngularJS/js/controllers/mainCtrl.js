angular.module('wettEditor').controller(
            'mainCtrl',
            [ '$rootScope', '$scope', '$filter', '$route' , 'alertService', '$window', '$location',
                    function($rootScope, $scope, $filter, $route, alertService, $window, $location )  {
             			$scope.$route = $route;
             			
             			 $rootScope.closeAlert = alertService.closeAlert; 
             			 
             			 $rootScope.userGlobal = {
             					 userName: '',
             					 passwort: '',
             					 userId: '',
             					 loggedIn: false
             			 }
             			 
             			 $scope.scrollToTop = function(){
             				$window.scrollTo(0, 0);
             			 }      				
         					
         		        
                    	//Modal oeffnen Login
                    	$scope.openLogin = function() {
        					var modalInstance = $uibModal.open({
        						animation : $scope.animationsEnabled,
        						templateUrl : 'pages/login.html',
        						controller : 'loginCtrl',
        						size : 'lg',
        					});
        					
        					
        				};
        				
        				
                    	//Modal oeffnen Registrieren
                    	$scope.openRegistrieren = function() {
        					var modalInstance = $uibModal.open({
        						animation : $scope.animationsEnabled,
        						templateUrl : 'pages/registrieren.html',
        						controller : 'registrierenCtrl',
        						size : 'lg',
        					});
        				
        				};
        				$scope.logout = function(){
        					 $rootScope.userGlobal = {
                 					 userName: '',
                 					 passwort: '',
                 					 userId: '',
                 					 loggedIn: false
                 			 };
        				};

                        $scope.changeRoute =function (route) {
                            $location.path(route);
                        }
         		        
                    } ]);

