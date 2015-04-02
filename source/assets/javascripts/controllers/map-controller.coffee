angular.module("summit-guide")
  .controller "MapCtrl", ($scope, $ionicLoading) ->
    $scope.mapCreated = (map) ->
      $scope.map = map
      return

    $scope.centerOnMe = ->
      console.log "Centering"
      if !$scope.map
        return
      $scope.loading = $ionicLoading.show(
        content: "Getting current location..."
        showBackdrop: false)
      navigator.geolocation.getCurrentPosition ((pos) ->
        console.log "Got pos", pos
        $scope.map.setCenter new (google.maps.LatLng)(pos.coords.latitude, pos.coords.longitude)
        $scope.loading.hide()
        return
      ), (error) ->
        alert "Unable to get location: " + error.message
        return
      return

    return
