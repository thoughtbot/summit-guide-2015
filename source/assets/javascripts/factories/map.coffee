angular.module("summit-guide")
  .service "MapService", ($filter, PicksService) ->
    picks = PicksService.all()
    markers_list = []

    initialize = () ->
      mapOptions =
        center: new (google.maps.LatLng)(39.746541, -104.993922)
        disableDefaultUI: true
        zoom: 17
        mapTypeId: google.maps.MapTypeId.ROADMAP
        styles: [
          featureType: "poi"
          stylers: [
            visibility: "off"
          ]
        ,
          featureType: "transit"
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

      icon =
        url: "/assets/marker-#{list}.png"
        size: new google.maps.Size(129, 156)
        scaledSize: new google.maps.Size(43, 52)
        anchor: new google.maps.Point(21, 52)

      marker = new google.maps.Marker
        map: map
        position: coordinates
        animation: google.maps.Animation.DROP
        icon: icon
        title: place.name

      markers_list.push marker
      google.maps.event.addListener marker, "mousedown", (e) ->
        showCard(place.name)

    cardClick = ($event) ->
      $event.currentTarget.classList.remove("active")

    centerMap = (marker) ->
      map.panTo
        lat: parseFloat marker.position.G
        lng: parseFloat marker.position.K

      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout ->
        marker.setAnimation(null)
      , 750

    getMarker = (name) ->
      for marker in markers_list
        if marker.title == name
          activeMarker = marker
      return activeMarker

    showCard = (name)->
      safeName = $filter('paramaterize')(name)
      allCards = document.getElementsByClassName("card")
      activeCard = document.querySelector(".card[data-name='#{safeName}']")
      makeActive = !activeCard.classList.contains("active")

      for card in allCards
        card.classList.remove("active")

      if makeActive
        activeCard.classList.add("active")

      marker = getMarker(name)
      centerMap marker

    map = initialize()

    return {
      showCard: (name) -> showCard(name)
    }
