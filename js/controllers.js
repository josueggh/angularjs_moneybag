mainApp.controller('bagController', ['$scope','localStorageService' , 
  
  function($scope,localStorageService){
    
    $scope.bucket       = 0;
    $scope.tobucket     = {};
    $scope.frombucket   = {}
    $scope.accounts     = localStorageService.get('accounts') ;

    $scope.updateBucket = function(){
      $scope.bucket= 0;
      angular.forEach( $scope.tobucket, function(value, key){
        $scope.bucket += value ;
        $scope.bucket -= $scope.frombucket[key] ;
      });
    }

    $scope.createAccount = function(){
      var d   = new Date();
      $scope.accounts[ 'account'+d.getTime() ] = $scope.bucket;
      $scope.bucket = 0;
    }

    $scope.save = function(){
      angular.forEach( $scope.accounts, function(value, key, e){

        $scope.accounts[key] -= $scope.tobucket[key];
        $scope.accounts[key] += $scope.frombucket[key];
  
        if( $scope.accounts[key] ==0){
         delete $scope.accounts[key] ;
        }
        $scope.tobucket[key] = 0;
        $scope.frombucket[key] = 0;

      });

      localStorageService.set('accounts' , $scope.accounts );
    }
  }

]);