'use strict';
angular.module('main')
.controller('StartCtrl', function ($window, $ionicPlatform, $state, $scope, $ionicSideMenuDelegate, Config, Start) {

  /**
   *
   * this & that binding
   *
  **/
  var that = this;

  // bind data from service
  this.someData = Start.someData;
  this.ENV = Config.ENV;
  this.BUILD = Config.BUILD;

  /**
   * sidemenu
   **/
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  /**
   * doRefresh function will refresh and retrieve new tweets..
   * as seen on: http://learn.ionicframework.com/formulas/pull-to-refresh/
   * google search: ionic pull to refresh
  **/
  this.doRefresh = function () {

    // check if we have keyboard open
    /*global ionic*/
    if (ionic.Platform.isWebView()) {

      if ($window.cordova.plugins.Keyboard.isVisible) {
        $window.cordova.plugins.Keyboard.hide();
      }

    }

    // clear tweets array
    that.someData.tweets = [];

    Start.init();

    $scope.$broadcast('scroll.refreshComplete');

  };

  /**
   * loadTweet is a function call that is being called when clicking Tweet
   * on start page. It brings the tweetID in and saves it into the
   * service variable
  **/
  this.loadTweet = function ($tweetParam) {
    this.someData.tweetId = $tweetParam;

    //console.log('testing loadTweet' + $tweetParam);
    //$state.params =  { tweetId: $tweetParam };
    $state.go('detail', { tweetId: $tweetParam });
  };

});
