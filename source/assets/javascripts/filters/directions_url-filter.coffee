angular.module("summit-guide")
  .filter "directions_url", ->
    (address) ->
      if address
        url = "https://maps.google.com?daddr="
        address = address
                .replace(/, /g, "")
                .replace(/ /g, "+")
                .replace(/'/g, "")
        return "#{url}#{address}"
