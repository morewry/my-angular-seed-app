angular.module("my-app")
  .constant("Sections", [
    {
      id: 1,
      name: "A",
      route: "/a/:id"
    },
    {
      id: 2,
      name: "B",
      route: "/b/:id"
    }
  ]);
