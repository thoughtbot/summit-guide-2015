angular.module("summit-guide")
  .directive "appToolbar", ->
    restrict: "E"
    replace: true
    transclude: true
    templateUrl: "templates/_toolbar.html"
