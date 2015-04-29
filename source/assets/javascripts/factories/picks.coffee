angular.module("summit-guide")
  .factory "PicksService", ($http) ->
    picks =
      bars: [{}],
      coffeeshops: [{}],
      restaurants: [
        {
          name: "Denver Biscuit Co"
          address: "5412 S. Broadway St"
          hours:
            open: 900
            close: 2300
          recommendation:
            by: "corwin"
            name: "The Franklin"
            why: "Fresh made biscuits, fried chicken, what more is there to want?"
        }
        {
          name: "Illegal Pete's"
          address: "1530 16th St #101"
          hours:
            open: 700
            close: 2400
          recommendation:
            by: "joshua"
            name: "The Big Potato"
            why: "A loaded baked potato wrapped in a burrito."
        }
      ]

    return {
      all: -> picks
      get: (list)-> picks[list]
    }
