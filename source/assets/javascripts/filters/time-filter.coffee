angular.module("summit-guide")
  .filter "time", ->
    formatTime = (time) ->
      split = time.match(/.{1,2}/g)

      if split[0] < 12
        period = "AM"
      else
        period = "PM"


      if split[0] < 13
        hours = split[0]
      else
        hours = split[0] - 12

      hours = parseInt(hours, 10)

      minutes = split[1]

      return "#{hours}:#{minutes}#{period}"

    (time) ->
      if time
        formattedTime = []
        times = time.split("-")

        for time in times
          formattedTime.push formatTime(time)

        return formattedTime.join(" to ")
