angular.module("summit-guide")
  .service "PicksService", ($http) ->
    picks =
      bars: JSON.parse(localStorage["bars"])
      coffeeshops: JSON.parse(localStorage["coffeeshops"])
      restaurants: JSON.parse(localStorage["restaurants"])
      dispensaries: JSON.parse(localStorage["dispensaries"])
      goods: JSON.parse(localStorage["goods"])
      activities: JSON.parse(localStorage["activities"])
      neighborhoods: JSON.parse(localStorage["neighborhoods"])
      office: JSON.parse(localStorage["office"])

    return {
      all: -> picks
      get: (list)-> picks[list]
    }
