'use strict';
angular.module('twitterClient', [
  // your modules
  'main'
])

.run(function ($ionicPlatform, $cordovaSplashscreen, Start) {

  /**
   * start with splashscreen if we're running on device...
  **/
  // /*global ionic*/
  // if (ionic.Platform.isWebView()) {
  //   $cordovaSplashscreen.show();
  // }

  /**
  * ionic platform ready?
  */
  $ionicPlatform.ready(function () {
    // CORDOVA DEVICES ONLY
    /*global ionic*/
    if (ionic.Platform.isWebView()) {
      $cordovaSplashscreen.hide();
    }

    // device is now ready... start init.
    Start.init();

    // console.log('we ran the init.');

  });

});
