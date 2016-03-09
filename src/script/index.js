angular.module("my-app", ["ngRoute", "my-sections", "my-a", "my-b", "my-nav"])
  .config(["$routeProvider", "Sections", function ($routeProvider, Sections) {
    Sections.forEach((section) => {
      $routeProvider.when(section.route, {
        templateUrl: `${section.name.toLowerCase()}.html`,
        controller: `${section.name.toUpperCase()}Controller`,
        resolve: {
          currentSection: function () {
            return section;
          }
        }
      });
    });
    $routeProvider.otherwise({
      redirectTo: "/a/1"
    });
  }])
  .controller("AppController", ["$route", "$rootScope", "Sections", function ($route, $rootScope, Sections) {
    this.navItems = Sections;
    $rootScope.$on("$routeChangeSuccess", () => {
      this.currentSection = $route.current.locals.currentSection;
    });
  }]);
