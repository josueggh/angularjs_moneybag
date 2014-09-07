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

    for(var i =1; i<= initial_accounts; i++){
      accounts['account'+i] = Math.floor(Math.random() * 100) + 5;
    }

    localStorageService.set('accounts' , JSON.stringify( accounts )); 
  }

});

mainApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/bags', { 
        templateUrl : '/partials/bags.html',
        controller  : 'bagController'
      })
      .otherwise({
        redirectTo : '/bags'
      });
  }
]);
