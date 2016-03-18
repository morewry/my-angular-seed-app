angular.module("my-section-a")

  .controller("AController", ["$scope", "$templateCache", "CSSStyleInjector", function ($scope, $templateCache, CSSStyleInjector) {
    // Most things should be added to the controller instance, "this", not "$scope"
    this.css = CSSStyleInjector.fetch("my-component", "a");
    CSSStyleInjector.remove("my-component", "b");
    CSSStyleInjector.add("my-component", "a");
  }]);
