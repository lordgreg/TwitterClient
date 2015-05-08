'use strict';
angular.module('main')
.controller('DetailCtrl', function ($ionicPlatform, $state, $stateParams, Start) {

  var tweetId = $stateParams.tweetId;
  var that = this;

  /**
   * iOS method for Swipe left to go back
   */
  this.onSwipeLeft = function () {
    $state.go('main', { '#': tweetId });
  };

  //console.log('Hello from your Controller: DetailCtrl in module main:. This is your controller:', this);
  // TODO: do your controller thing
  //OPTION 1 TO RETRIEVE ID
  // CAUTION> using this option and refreshing, you will lose binded data!
  //console.log('Tweet id: ' + Start.someData.tweetId);

  // OPTION 2 TO RETRIEVE ID
  //console.log('State Params');
  //console.log($stateParams);
  //var tweetId = $stateParams.tweetId;
  //var that = this;
  //this.tweet = [];

  // run Tweet retriaval function
  Start.getToken().then(function () {

    Start.getSingleTweetById(tweetId).then(function (data) {
      that.tweet = data.data;
      console.log(that.tweet);

    });

    //    Start.getTweetsByHashtag(that.search).then(function (data) { //2. so you can use .then()
    //console.log('DATA: ' + data);

    //      that.tweets = data.data.statuses;
    //      console.log(that.tweets);
    //    });

  });

});
