angular.module("summit-guide")
  .controller "SummitController", ($scope, ScheduleService) ->
    $scope.schedule = ScheduleService.all()
