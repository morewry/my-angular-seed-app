angular.module("my-nav")
  .directive("myNav", function () {
    return {
      scope: {
        items: "=",
        selected: "="
      },
      bindToController: true,
      controller: function () {},
      controllerAs: "Nav",
      template: `
      <ul class="nav">
        <li ng-repeat="item in Nav.items track by item.id" class="nav--item">
          <a class="nav--link" ng-href="{{item.href}}" ng-class="{ 'active': item.id === Nav.selected.id }">
            Section {{item.name}}
          </a>
        </li>
      </ul>
      `
    };
  });
