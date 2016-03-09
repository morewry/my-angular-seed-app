angular.module("my-b", [])
  .controller("BController", ["$scope", "$location", "$route", function ($scope, $location, $route) {
    $scope.$location = $location;
    $scope.$route = $route;
  }]);
