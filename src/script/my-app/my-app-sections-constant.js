angular.module("my-app")

  .constant("Sections", [
    {
      id: 1,
      name: "A",
      route: "/a"
    },
    {
      id: 2,
      name: "B",
      route: "/b"
    },
    {
      id: 3,
      name: "C",
      route: "/c/:stuff"
    }
  ]);

  // If you don't have to use :params, the objects can be identical
  // To those required by gui-nav items, and use "href" instead of "route"
