/**
 * Created by jermoret on 19.11.2015.
 */
(function () {
  var chart = angular.module('app', ['chart.js', 'ui.router']);

  chart.controller('DoughnutCtrl', function ($scope) {
    $scope.labels = ["Download sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
  });

  chart.config(function ($stateProvider) {
    $stateProvider.state('audiance', {
      templateUrl: 'views/audiance.jade',
      url: '/audiance'
    });
    $stateProvider.state('debug', {
      templateUrl: 'views/debug.jade',
      url: '/debug'
    });
    $stateProvider.state('board', {
      templateUrl: 'views/board.jade',
      url: '/board'
    });
  });
})();
