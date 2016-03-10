angular.module("my-section-a")
  .controller("AController", ["$scope", "$location", "$route", function ($scope, $location, $route) {
    $scope.$location = $location;
    $scope.$route = $route;
  }]);
