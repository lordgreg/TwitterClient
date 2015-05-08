'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])

.config(function ($stateProvider, $urlRouterProvider) {

  //console.log('Allo! Allo from your module: ' + 'main');

  $urlRouterProvider.otherwise('/main');

  // some basic routing
  $stateProvider

  /**
  * Using main page, showing tweets with specific hashtags etc.
  * We are using start.html as template here
  */
  .state('main', {
    url: '/main',
    templateUrl: 'main/templates/start.html',
    controller: 'StartCtrl as start'
  })

  /**
  * Details page, when we click specific Tweet, we are take to this
  * page with more details of single tweet
  */
  .state('detail', {
    url: '/detail/:tweetId',
    templateUrl: 'main/templates/detail.html',
    controller: 'DetailCtrl as detail'

  })

  /**
  * For search, we are using search.html as template. We have to bring the
  * text string back to the previous page
  */
  .state('search', {
    url: '/search',
    templateUrl: 'main/templates/search.html',
    controller: 'SearchCtrl as search'
  });

  // TODO: do your thing
});
