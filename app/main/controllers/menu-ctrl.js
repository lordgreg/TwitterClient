'use strict';
angular.module('main')
.controller('MenuCtrl', function ($state, $scope, Start) {

  // bind tweet sorting from service
  this.someData = Start.someData;
  // this.tweetOrderReverse = Start.someData.tweetOrderReverse;

  /**
  * SORTING
  */
  $scope.sortByUser = function () {

    console.log('test');

  };

});
