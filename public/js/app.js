/**
 * Created by jermoret on 19.11.2015.
 */
var app = angular.module('app', [
  'chart.js',
  'ui.router',
  'btford.socket-io'
]);

app.factory('mySocket', function (socketFactory) {
  return socketFactory();
});

app.controller('chartCtrl', function ($scope, mySocket) {
  /*var votes = {
    yes: 0,
    no: 0,
    idknow: 0
  };*/

  $scope.labels = ['Yes', 'No', 'I don\'t know'];
  $scope.data = [];
  $scope.vote = function(voteId) {
    /*switch(voteId) {
      case "yes":
            votes.yes++;
            break;
      case "no":
            votes.no++;
            break;
      case "idknow":
            votes.idknow++;
            break;
    }*/
    mySocket.emit(voteId);
  };

  $scope.reset = function() {
    mySocket.emit('reset');
  };

  mySocket.forward('updateVotes', $scope);

  $scope.$on('socket:updateVotes', function(ev, data) {
    $scope.data = [data.yes, data.no, data.idontknow];
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('index', {
    templateUrl: 'views/index.jade',
    url: ''
  });

  $stateProvider.state('audiance', {
    templateUrl: 'views/partials/audiance.jade',
    url: '/audiance'
  });

  $stateProvider.state('board', {
    templateUrl: 'views/partials/board.jade',
    url: '/board'
  });

  $stateProvider.state('debug', {
    templateUrl: 'views/partials/debug.jade',
    url: '/debug'
  });
});




/*
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
 })();*/
