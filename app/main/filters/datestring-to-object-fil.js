'use strict';
angular.module('main')
.filter('datestringToObject', function () {
  return function (input) {

    var dateObject = new Date(input);

    if (angular.isDate(dateObject)) {
      return dateObject;
    }
    else {
      return input;
    }

    //return 'datestringToObject filter:' + input;
  };
});
