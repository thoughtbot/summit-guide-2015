angular.module("summit-guide")
  .filter "time", ->
    formatTime = (time) ->
      split = time.match(/.{1,2}/g)
      hour = split[0]

      if hour < 12 || hour > 23
        period = "AM"
      else
        period = "PM"

      if hour > 12
        hour -= 12

      hour = parseInt(hour, 10)

      minutes = split[1]

      return "#{hour}:#{minutes}#{period}"

    (time) ->
      if time
        formattedTime = []
        times = time.split("-")

        for time in times
          formattedTime.push formatTime(time)

        return formattedTime.join(" to ")
