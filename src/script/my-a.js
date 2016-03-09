angular.module("my-a", [])
  .controller("AController", ["$scope", "$location", "$route", function ($scope, $location, $route) {
    $scope.$location = $location;
    $scope.$route = $route;
  }]);
