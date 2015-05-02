angular.module("summit-guide")
  .filter "paramaterize", ->
    (string) ->
      if string
        return string.replace(/'/g, "")
                .replace(/"/g, "")
                .replace(/ /g, "")
                .toLowerCase()
