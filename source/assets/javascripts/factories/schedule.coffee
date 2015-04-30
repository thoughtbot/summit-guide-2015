angular.module("summit-guide")
  .service "ScheduleService", ($http) ->
    schedule = JSON.parse(localStorage["schedule"])

    return {
      all: -> schedule
    }
