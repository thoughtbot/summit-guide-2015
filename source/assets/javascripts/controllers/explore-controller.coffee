angular.module("summit-guide")
  .controller "ExploreController", ($scope, PicksService, MapService) ->
    getPlaces = (picks) ->
      array = []
      for list, places of picks
        for key, place of places
          array.push place
      return array

    $scope.places = getPlaces PicksService.all()
