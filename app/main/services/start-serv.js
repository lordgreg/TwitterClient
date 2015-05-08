'use strict';
angular.module('main')
.service('Start', function ($state, $window, $http, $ionicPlatform, $cordovaNetwork) {
  //console.log('Hello from your Service: Start in module main');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working',
    tweetId: null,
    tweetOrder: 'created_at',
    tweetOrderReverse: true,
    searchString: '#angular',
    isOnline: true,
    errorString: '',
    tweets: []
  };

  /**
  * Android BackButton register
  **/
  $ionicPlatform.registerBackButtonAction(function () {

    // DETAIL PAGE
    if ($state.current.name === 'detail') {
      $state.go('main');
    }

    // START PAGE- pressing back will exit app
    else {
      /*global navigator*/
      navigator.app.exitApp();
    }

  }, 100);

  /**
   * Open in-app browser from mwaysolutions
  **/
  this.openBrowser = function ($link) {
    // use ONLY for WEBVIEW!
    //debugger;
    /*global ionic*/
    if (ionic.Platform.isWebView()) {
      $window.webview.openWebView(null, null, {
        iconColor: ' #ffffff',
        backgroundColor: '#cdcdcd',
        isPDF: false,
        url: $link,
        visibleAddress: false,
        editableAddress: false,
        icons:{
          backward: true,
          forward: true,
          refresh: true
        }
      });
    }
  };

  /**
   * Before we do anything with network, let's check if we have
   * network connection
   */
  this.checkConnection = function () {
    //debugger;
    //return true;
    // ACTUAL (CORDOVA) DEVICES
    /*globals ionic*/
    if (ionic.Platform.isWebView()) {
      // console.log('checking network on actual device... ');
      // console.log($cordovaNetwork.isOnline());
      this.someData.isOnline = $cordovaNetwork.isOnline();
    }
    // BROWSER check
    else {
      this.someData.isOnline = $window.navigator.onLine;
    }

    // what now? got error or not?
    if (!this.someData.isOnline) {
      this.someData.errorString = 'No network connection.';
    }
    else {
      this.someData.errorString = '';
    }

    return this.someData.isOnline;
    // return true;
  };

  /**
  *
  * twitter auth
  *
  */
  var consumerKey = encodeURIComponent('VhuzvbL90a0klT24aQp5pyIht');
  var consumerSecret = encodeURIComponent('F3aXg7jKikm0tvAPPfdpvAcIbuk2iUyOS3L69zA7vxl29F0EXc');
  this.getToken = function () {
    var tokenCredentials = $window.btoa(consumerKey + ':' + consumerSecret);
    return $http({
      method: 'POST',
      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Basic ' + tokenCredentials
      },
      data: 'grant_type=client_credentials'
    })
    .then(function (result) {
      /*jshint -W106 */
      if (result.data && result.data.access_token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  /*
  * GET search/tweets
  * https://dev.twitter.com/rest/reference/get/search/tweets
  *
  * https://api.twitter.com/1.1/search/tweets.json
  * params: q=text_string, result_type (recent), count=30
  *
  */
  this.getTweetsByHashtag = function ($inputText) {
    // no input was given, let's search for #
    if ($inputText === undefined) {
      $inputText = '#angular';
      this.someData.searchString = $inputText;
    }
    //console.log($inputText);
    // make a $http GET call and retrieve the tweets
    var req = {
      method: 'GET',
      url: 'https://api.twitter.com/1.1/search/tweets.json',
      params: { q: $inputText, 'result_type': 'recent', count: 30 }
    };
    return $http(req)
    .success(function () {
      // everything worked, let's return the json data
      console.log('Tweets retrieved.');
      //return data;
    })
    .error(function (data) {
      console.log(data);
    });

  };

  /**
   * GET statuses/show/:id
   * https://dev.twitter.com/rest/reference/get/statuses/show/%3Aid
   *
   * Example: GET https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672
   */
  this.getSingleTweetById = function ($tweetId) {

    console.log('Retrieving tweet with ID ' + $tweetId);

    var req = {
      method: 'GET',
      url: 'https://api.twitter.com/1.1/statuses/show.json',
      params: { id: $tweetId }
    };

    return $http(req)
      .success(function (data) { console.log('Tweet retrieved: ' + data); })
      .error(function (data) { console.log('Cannot retrieve tweet (' + $tweetId + '): ' + data.errors[0].message); })
    ;

  };

  /**
  *
  * Authenticate with Twitter first
  * then get latest tweets
  *
  **/
  this.init = function () {
    // always check for connection problems
    if (this.checkConnection()) {

      var that = this;

      this.getToken().then(function () {

        console.log('searching for ' + that.someData.searchString);

        that.getTweetsByHashtag(that.someData.searchString).then(function (data) { //2. so you can use .then()
          //console.log('DATA: ' + data);

          that.someData.tweets = data.data.statuses;
          console.log(that.someData.tweets);
        });

      });
    }
  };

});
