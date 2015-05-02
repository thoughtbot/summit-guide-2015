angular.module("summit-guide")
  .controller "ListController", ($scope, $location, list, MapService) ->
    $scope.list = list

    $scope.cardClick = ($event) ->
      card = $event.currentTarget
      title = card.getElementsByTagName("h2")[0].innerHTML

      $location.path("/explore")
      setTimeout ->
        MapService.showCard(title)
      , 1000
