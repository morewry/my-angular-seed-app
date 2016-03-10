angular.module("my-app")
  .controller("AppController", ["$route", "$location", "$rootScope", "Sections", function ($route, $location, $rootScope, Sections) {
    this.navItems = Sections;
    $rootScope.$on("$routeChangeSuccess", () => {
      console.log($route.current, $route.current.regexp, $route.current.regexp.test($location.path()));
      this.currentSection = $route.current.locals.currentSection;
    });
  }]);
