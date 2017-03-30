angular.module('wettEditor').filter('unitFilter', [
    "$filter", function($filter) {
      return function(input) {
        if(input == 5){
			return false;
		}else if(input == 7){
			return false;
		}else if(input == 8){
			return false;
		}else if(input == 9){
			return false;
		}else{
			return true;
		}
		
      }
    }
  ]);

