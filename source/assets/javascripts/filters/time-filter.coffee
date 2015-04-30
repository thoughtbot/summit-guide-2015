angular.module("summit-guide")
  .filter "time", ->
    (time) ->
      split = time.match(/.{1,2}/g)
      if split[0] < 13
        hours = split[0]
        period = "am"
      else
        hours = split[0] - 12
        period = "pm"

      hours = parseInt(hours, 10)

      minutes = split[1]

      return "#{hours}:#{minutes} #{period}"
