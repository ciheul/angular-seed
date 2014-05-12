'use strict';

/* Controllers */

var jendela24Controllers = angular.module('jendela24Controllers', [
  'ui.bootstrap',
  'ngRoute',
]);


jendela24Controllers.controller('NewsFeedCtrl',
  ['$scope', '$modal', 'News', 'Activity',
  function($scope, $modal, News, Activity) {
    var limit = 20;
    $scope.newsfeed = News.list({offset: 0, limit: limit});

    var offset = 20;
    $scope.loadMore = function() {
      console.log("loadMore");
      News.list({offset: offset, limit: limit}, 
        function success(result) {
          $scope.newsfeed.push.apply($scope.newsfeed, result);
        }
      );
      offset += limit;
    };
  
    //$scope.showDetailNews = function() {
    //  var news = $(this)[0].news;

    //  Activity.read({'article_id': news.id});
    //  
    //  var modalDetailNews = $modal.open({
    //    templateUrl: '/static/a/jendela24/partials/detail_news_modal.html',
    //    controller: ModalDetailNewsCtrl,
    //    resolve: {
    //      news: function() {return news;},
    //    }
    //  });
    //};
  }]
);


jendela24Controllers.controller('DetailNewsCtrl',
  ['$scope', '$routeParams', '$http', 'Activity', 'News',
  function($scope, $routeParams, $http, Activity, News) {
    News.detail({'article_id': $routeParams.news_id}, function success(data) {
      $scope.news = data;
      Activity.read({'article_id': $scope.news.id});
      $scope.news.stat.reads += 1;
    });

    $scope.post_like = function() {
      Activity.like({'article_id': $scope.news.id}, function success(result) {
        $scope.news.activity.like = true;
        $scope.news.stat.likes += 1;
        if ($scope.news.activity.dislike === true) {
          $scope.news.activity.dislike = false;
          $scope.news.stat.dislikes -= 1;
        }
      });
    };

    $scope.post_unlike = function() {
      Activity.unlike({'article_id': $scope.news.id}, function success(result) {
        $scope.news.activity.like = false;
        $scope.news.stat.likes -= 1;
      });
    };

    $scope.post_dislike = function() {
      Activity.dislike({'article_id': $scope.news.id}, function success(result) {
        $scope.news.activity.dislike = true;
        $scope.news.stat.dislikes += 1;
        if ($scope.news.activity.like === true) {
          $scope.news.activity.like = false;
          $scope.news.stat.likes -= 1;
        }
      });
    };

    $scope.post_canceldislike = function() {
      Activity.canceldislike({'article_id': $scope.news.id}, function success(result) {
        $scope.news.activity.dislike = false;
        $scope.news.stat.dislikes -= 1;
      });
    };
  }]
);


var ModalDetailNewsCtrl = function($scope, $modalInstance, Activity, news) {
  $scope.news = news;
  $scope.news.stat.reads += 1;

  $scope.post_like = function() {
    Activity.like({'article_id': news.id}, function success(result) {
      $scope.news.activity.like = true;
      $scope.news.stat.likes += 1;
      if ($scope.news.activity.dislike === true) {
        $scope.news.activity.dislike = false;
        $scope.news.stat.dislikes -= 1;
      }
    });
  };

  $scope.post_unlike = function() {
    Activity.unlike({'article_id': news.id}, function success(result) {
      $scope.news.activity.like = false;
      $scope.news.stat.likes -= 1;
    });
  };

  $scope.post_dislike = function() {
    Activity.dislike({'article_id': news.id}, function success(result) {
      $scope.news.activity.dislike = true;
      $scope.news.stat.dislikes += 1;
      if ($scope.news.activity.like === true) {
        $scope.news.activity.like = false;
        $scope.news.stat.likes -= 1;
      }
    });
  };

  $scope.post_canceldislike = function() {
    Activity.canceldislike({'article_id': news.id}, function success(result) {
      $scope.news.activity.dislike = false;
      $scope.news.stat.dislikes -= 1;
    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};


jendela24Controllers.controller('TopNavigationCtrl', ['$scope', '$modal', '$log',
  function($scope, $modal, $log) {
    //$scope.items = ['item1', 'item2', 'item3'];
    $scope.items = [
      "The first choice!",
      "And another choice for you.",
      "but wait! A third!"
    ];

    $scope.open = function() {
      var modalInstance = $modal.open({
        templateUrl: '/static/a/jendela24/partials/login_modal.html',
        controller: ModalInstanceCtrl,
        keyboard: true,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = $scope.selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }]
);


var ModalInstanceCtrl = function($scope, $http, $window, $location, $modalInstance, items) {
  $scope.items = items;
  
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.login_twitter = function() {
    $http({
      method: 'GET', 
      url: 'http://' + ip_address + '/accounts/login_twitter',
    }).success(function(data) {
        $window.location.href = data;
      }).
      error(function(data, status, header, config) {
      });
  };
};


jendela24Controllers.controller('ProfileCtrl', ['$scope', '$window', 'User',
  function($scope, $window, User) {
    var w = angular.element($window);
    w.unbind("scroll");

    User.profile(function success(data) {
      $scope.user = data;
    });

    User.reads(function success(data) {
      $scope.user.reads = data;
    });

    User.likes(function success(data) {
      $scope.user.likes = data;
    });

    User.dislikes(function success(data) {
      $scope.user.dislikes = data;
    });

    User.shares(function success(data) {
      $scope.user.shares = data;
    });
  }
]);
