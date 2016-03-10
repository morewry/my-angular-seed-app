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
