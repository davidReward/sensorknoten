angular.module('wettEditor').controller(
            'mainCtrl',
            [ '$rootScope', '$scope','myAuth', '$filter', '$route' , 'alertService', '$window', '$location',
                    function($rootScope, $scope, myAuth , $filter, $route, alertService, $window, $location )  {

            	//AUTH


				//AUTH ENDE

            	$scope.$route = $route;
             			
             	$rootScope.closeAlert = alertService.closeAlert;
             			 
             	$rootScope.userGlobal = {
						 userName: '',
						 passwort: '',
						 loggedIn: true
				 }

                $rootScope.handlingError = function (response) {
                    if(response.status == 401){
                        $rootScope.userGlobal.loggedIn = false;
                    }
                }

				 $scope.scrollToTop = function(){
					$window.scrollTo(0, 0);
				 }

                $scope.login = function () {
				    userName = $rootScope.userGlobal.userName;
                    passwort = $rootScope.userGlobal.passwort;

                    myAuth.login(userName, passwort);
                    $rootScope.userGlobal.loggedIn = true;
                }

                $scope.logout = function(){
				     myAuth.logout();
                     $rootScope.userGlobal.loggedIn = false;
                     $rootScope.userGlobal.userName = '';
                     $rootScope.userGlobal.passwort = '';
                }

				$scope.changeRoute =function (route) {
					$location.path(route);
				}

                    } ]);

