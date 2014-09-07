mainApp.controller('bagController', ['$scope','localStorageService' , 

  function($scope,localStorageService){
    
    $scope.bucket       = 0;
    $scope.tobucket     = {};
    $scope.frombucket   = {}
    $scope.accounts     = localStorageService.get('accounts');
    $scope.history      = localStorageService.get('history');

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
      angular.forEach( $scope.accounts, function(value, key){

        $scope.accounts[key] -= $scope.tobucket[key];
        $scope.accounts[key] += $scope.frombucket[key];
  
        if( $scope.accounts[key] ==0){
         delete $scope.accounts[key] ;
        }

        $scope.tobucket[key] = 0;
        $scope.frombucket[key] = 0;

      });
      $scope.history.push( $scope.accounts);
      localStorageService.set('history'  , $scope.history);
      localStorageService.set('accounts' , $scope.accounts );
    }
  }

]);


mainApp.controller('historyController', ['$scope','localStorageService' , 

  function($scope,localStorageService){
    $scope.history     = localStorageService.get('history');

    $scope.positive = function(index,key){
      if( index > 1 ){

        if( $scope.history[index-2].hasOwnProperty(key) ){
        
          if( $scope.history[index-2][key] > $scope.history[index-1][key] ){
            return false;
          }

        }
      }
      return true;
    }
  }
]);