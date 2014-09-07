'use strict';

var mainApp = angular.module( 'mainapp' , [
  'ngRoute',
  'LocalStorageModule'
]);

mainApp.run( function (localStorageService){

  // localStorageService.clearAll();
  
  if( localStorageService.get('accounts') === null){

    var initial_accounts = 2;
    var accounts = {};
    var history = [];
    var d = new Date(); 
    
    for(var i =1; i<= initial_accounts; i++){
      accounts['account'+ d.getTime() + (i*100) ] = Math.floor(Math.random() * 100) + 5;
    }

    history.push( accounts);

    localStorageService.set('accounts' , JSON.stringify( accounts )); 
    localStorageService.set('history'  , JSON.stringify( history  ))
  }

});

mainApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/money', {
        templateUrl : '/partials/bags.html',
        controller  : 'bagController'
      })
      .when('/history', {
        templateUrl : '/partials/history.html',
        controller  : 'historyController'
      })
      .otherwise({
        redirectTo : '/money'
      });
  }
]);
