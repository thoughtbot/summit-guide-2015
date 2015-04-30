angular.module("summit-guide")
  .directive "appNav", ->
    restrict: "E"
    replace: true
    transclude: true
    templateUrl: "templates/_nav.html"
