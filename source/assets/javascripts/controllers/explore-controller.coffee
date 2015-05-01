angular.module("summit-guide")
  .controller "ExploreController", ($scope, $ionicLoading, PicksService) ->
    initialize = () ->
      mapOptions =
        center: new (google.maps.LatLng)(39.746541, -104.993922)
        zoom: 16
        mapTypeId: google.maps.MapTypeId.ROADMAP

      $element = document.getElementsByClassName("map")[0]
      map = new (google.maps.Map)($element, mapOptions)

      google.maps.event.addDomListener $element, "mousedown", (e) ->
        e.preventDefault()
        false

      return map

    getPlaces = (picks) ->
      array = []
      for list, places of picks
        for key, place of places
          array.push place
      return array

    markMap = (places, map) ->
      for place in places
        addMarker(place, map)

    addMarker = (place, map) ->
      coordinates = new google.maps.LatLng(place.coordinates.lat, place.coordinates.long)

      marker = new google.maps.Marker(
        position: coordinates,
        map: map,
        title: place.name
      )

    if document.readyState == "complete"
      map = initialize()
      picks = PicksService.all()
      places = getPlaces(picks)
      markMap(places, map)
    else
      google.maps.event.addDomListener window, "load", initialize
    return
