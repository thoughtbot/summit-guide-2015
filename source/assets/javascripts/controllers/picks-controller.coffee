angular.module("summit-guide")
  .controller "PicksController", ($scope, PicksService) ->
    $scope.picks = PicksService.all()
