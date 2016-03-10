angular.module("my-app")
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
  }]);
