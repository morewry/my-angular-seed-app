angular.module("my-sections", [])
  .constant("Sections", [
    {
      id: 1,
      name: "A",
      route: "/a/:id",
      href: "#/a/2"
    },
    {
      id: 2,
      name: "B",
      route: "/b/:id",
      href: "#/b/1"
    }
  ]);
