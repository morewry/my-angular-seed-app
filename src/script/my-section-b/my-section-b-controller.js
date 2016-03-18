angular.module("my-section-b")

  .controller("BController", ["$scope", "$templateCache", "CSSStyleInjector", function ($scope, $templateCache, CSSStyleInjector) {
    // Most things should be added to the controller instance, "this", not "$scope"
    this.css = CSSStyleInjector.fetch("my-component", "b");
    CSSStyleInjector.remove("my-component", "a");
    CSSStyleInjector.add("my-component", "b");
  }]);
