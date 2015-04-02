angular.module("summit-guide", ["ionic"])
  .run ($ionicPlatform) ->
    $ionicPlatform.ready ->
      if window.StatusBar
        StatusBar.styleDefault()
      return
    return
