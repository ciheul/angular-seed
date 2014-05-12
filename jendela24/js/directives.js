'use strict';

/* Directives */

var jendela24Directives = angular.module('jendela24Directives', []);


jendela24Directives.directive('whenScrolled', function($window, $document) {
  function link(scope, element, attrs) {
    var w = angular.element($window);
    var d = angular.element($document);
    w.bind("scroll", function() {
      if (w.scrollTop() + w.height() == d.height()) {
        scope.$apply(attrs.whenScrolled);
      }
    });
  }

  return {
    link: link,
    //scope: {
    //  newsfeed: '=',
    //},
  };
});

