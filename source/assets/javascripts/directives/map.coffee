angular.module("summit-guide")
  .directive "map", ->
    restrict: "E"
    replace: true
    transclude: true
    scope:
      onCreate: "&"

    link: ($scope, $element, $attr) ->
      initialize = ->
        mapOptions =
          center: new (google.maps.LatLng)(39.746541, -104.993922)
          zoom: 16
          mapTypeId: google.maps.MapTypeId.ROADMAP

        map = new (google.maps.Map)($element[0], mapOptions)
        $scope.onCreate map: map

        google.maps.event.addDomListener $element[0], "mousedown", (e) ->
          e.preventDefault()
          false
        return

      if document.readyState == "complete"
        initialize()
      else
        google.maps.event.addDomListener window, "load", initialize
      return
