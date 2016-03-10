angular.module("my-app")

  .controller("AppController", ["$route", "$rootScope", "Sections", function ($route, $rootScope, Sections) {

    this.navItems = Sections.map(function (section) {
      var paramRegex = /[\/]([:][^\/]+)[\/]?/;
      return {
        id: section.id,
        name: section.name,
        href: `#${paramRegex.test(section.route) ? section.route.replace(paramRegex, "/example-of-uris-with-params") : section.route}`
      };
    });

    $rootScope.$on("$routeChangeSuccess", () => {
      // For convenience. Obviously, anywhere the locals are needed
      // You can simply inject $route and inspect $route.current
      this.currentSection = $route.current.locals.currentSection;
    });

  }]);
