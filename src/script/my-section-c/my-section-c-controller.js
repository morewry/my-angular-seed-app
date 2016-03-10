angular.module("my-section-c")

  .controller("CController", ["$scope", "$location", "$route", function ($scope, $location, $route) {

    // Can be useful to add other services directly to scope, but...
    $scope.$location = $location;
    $scope.$route = $route;

    // Most things should be added to the controller instance "this", not "$scope"
    this.path = $location.path();
    this.params = $route.current.params;
    this.match = $route.current.regexp.test($location.path());

  }]);
