angular.module("summit-guide")
  .directive "appHeader", ->
    restrict: "E"
    replace: true
    transclude: true
    templateUrl: "templates/_header.html"
