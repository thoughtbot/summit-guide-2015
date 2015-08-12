angular.module("summit-guide")
  .directive "directionsLink", ->
    restrict: "E"
    replace: true
    transclude: true
    scope:
      address: "@"
    templateUrl: "templates/_directions-link.html"
