'use strict';

/* App Module */

var jendela24App = angular.module('jendela24App', [
  'ngRoute', 
  'jendela24Controllers', 
  'jendela24Directives',
  'jendela24Services'
]);

jendela24App.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});


jendela24App.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'NewsFeedCtrl',
        templateUrl: '/static/a/jendela24/partials/newsfeed.html'
      }).
      when('/news/:news_id', {
        controller: 'DetailNewsCtrl',
        templateUrl: '/static/a/jendela24/partials/detail_news.html'
      }).
      when('/profile', {
        controller: 'ProfileCtrl',
        templateUrl: '/static/a/jendela24/partials/profile.html'
      });
  }
]);


jendela24App.config(['$httpProvider',
  function($httpProvider) {
    //$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    console.log(getCookie('csrftoken'));
    $httpProvider.defaults.headers.post['X-CSRFToken'] = getCookie('csrftoken');
  }
]);


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
//var csrftoken = getCookie('csrftoken');
