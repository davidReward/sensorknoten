angular.module('wettEditor').service('userDataService',[ '$http', '$location' ,
															function($http , $location) {
    var srv = {};

    srv._baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/resteffmanage';

    //get User
    srv.getUser = function(userId) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/user",
			  params: {'userId': userId},
			});
    };
    //change User
    srv.changeUser = function(userId,user) {
    	console.log(user);
		return $http({
			  method: 'PUT',
			  url: srv._baseUrl + "/user/",
			  params: {'userId': userId},
			  data: user
			});
    };
    //new User
    srv.newUser = function(user) {
		return $http({
			  method: 'POST',
			  url: srv._baseUrl + "/",
			  data: user
			});
    };
  //change User
    srv.changePasswort = function(userId,passwort) {
		return $http({
			  method: 'PUT',
			  url: srv._baseUrl + "/user/passwort",
			  params: {'userId': userId},
			  data: passwort
			});
    };
    //login
    srv.loginUser = function(user) {
		return $http({
			  method: 'GET',
			  url: srv._baseUrl + "/user/login",
			  params: {'userName': user.userName, 'passwort': user.passwort},
			});
    };
    

    // Public API
    return {
    	getUser: function(userId) {
            return srv.getUser(userId);
        },
        changeUser: function(userId,user) {
            return srv.changeUser(userId,user);
        },
        newUser: function(userId,user) {
            return srv.newUser(userId,user);
        },
        changePasswort: function(userId,passwort) {
            return srv.changePasswort(userId,passwort);
        },
        loginUser: function(user) {
            return srv.loginUser(user);
        }
  
    };
}]);