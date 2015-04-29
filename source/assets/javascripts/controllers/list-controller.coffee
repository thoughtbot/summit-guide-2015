angular.module("summit-guide")
  .controller "ListController", ($scope, list, PicksService) ->
    $scope.list = list

    return
