angular.module("my-app")

  .config(["$routeProvider", "Sections", function ($routeProvider, Sections) {

    // Dynamically build routes from config in Section constant
    Sections.forEach((section) => {
      $routeProvider.when(section.route, {
        templateUrl: `${section.name.toLowerCase()}.html`,
        controller: `${section.name.toUpperCase()}Controller`,
        controllerAs: `${section.name.toLowerCase()}ctrl`,
        resolve: {
          currentSection: function () {
            return section;
          }
        }
      });
    });

    $routeProvider.otherwise({
      redirectTo: "/a"
    });

  }]);
