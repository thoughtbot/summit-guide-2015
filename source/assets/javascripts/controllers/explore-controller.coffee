angular.module("summit-guide")
  .controller "ExploreController", ($scope, $ionicLoading, PicksService) ->
    initialize = () ->
      mapOptions =
        center: new (google.maps.LatLng)(39.746541, -104.993922)
        zoom: 17
        mapTypeId: google.maps.MapTypeId.ROADMAP
        styles: [
          {
            featureType: "poi"
            stylers: [
              visibility: "off"
            ]
          }
        ]

      $element = document.getElementsByClassName("map")[0]
      map = new (google.maps.Map)($element, mapOptions)

      google.maps.event.addDomListener $element, "mousedown", (e) ->
        e.preventDefault()
        false

      return map

    getPlaces = (picks) ->

    markMap = (places, map) ->
      addOffice(map)

      for list, places of picks
        for key, place of places
          addMarker(place, list, map)

    addOffice = (map) ->
      office =
        name: "thoughtbot Denver"
        address: "1600 Champa St"
        coordinates:
          lat: 39.746498
          long: -104.993246

      addMarker(office, "office", map)

    addMarker = (place, list, map) ->
      coordinates = new google.maps.LatLng(place.coordinates.lat, place.coordinates.long)

      marker = new google.maps.Marker(
        position: coordinates,
        map: map,
        title: place.name
        icon: "/assets/#{list}-marker.svg"
      )

      google.maps.event.addListener(marker, 'click', showCard)

    showCard = ->
      marker = this
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout ->
        marker.setAnimation(null)
      , 700

      map.panTo({lat: marker.position.A, lng: marker.position.F})

    if document.readyState == "complete"
      picks = PicksService.all()
      map = initialize()
      markMap(picks, map)
    else
      google.maps.event.addDomListener window, "load", initialize
    return
