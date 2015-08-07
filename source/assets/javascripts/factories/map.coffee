angular.module("summit-guide")
  .service "MapService", ($filter, PicksService) ->
    picks = PicksService.all()
    markers_list = []

    initialize = () ->
      mapOptions =
        center: new (google.maps.LatLng)(39.746541, -104.993922)
        zoom: 17
        mapTypeId: google.maps.MapTypeId.ROADMAP
        styles: [
          featureType: "poi"
          stylers: [
            visibility: "off"
          ]
        ]

      $element = document.getElementsByClassName("map")[0]
      map = new (google.maps.Map)($element, mapOptions)

      google.maps.event.addListenerOnce map, "idle", ->
        markMap(picks, map)

      return map

    markMap = (places, map) ->
      for list, places of picks
        for key, place of places
          addMarker(place, list, map)

    addMarker = (place, list, map) ->
      coordinates = new google.maps.LatLng(place.coordinates.lat, place.coordinates.long)

      marker = new google.maps.Marker
        position: coordinates,
        map: map,
        title: place.name
        icon: "/assets/#{list}-marker.svg"

      markers_list.push marker
      google.maps.event.addListener marker, "mousedown", (e) ->
        showCard(place.name)

    cardClick = ($event) ->
      $event.currentTarget.classList.remove("active")

    centerMap = (marker) ->
      map.panTo
        lat: marker.position.G
        lng: marker.position.K
      marker.setAnimation(google.maps.Animation.BOUNCE)

      setTimeout ->
        marker.setAnimation(null)
      , 700

    showCard = (name)->
      safeName = $filter('paramaterize')(name)
      allCards = document.getElementsByClassName("card")
      activeCard = document.querySelector(".card[data-name='#{safeName}']")
      makeActive = !activeCard.classList.contains("active")

      for card in allCards
        card.classList.remove("active")

      if makeActive
        activeCard.classList.add("active")

      #centerMap marker

    map = initialize()

    return {
      showCard: (name) -> showCard(name)
    }
