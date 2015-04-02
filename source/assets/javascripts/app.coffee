angular.module('summit-guide', [
  'ionic'
  'summit-guide.controllers'
  'summit-guide.directives'
]).run ($ionicPlatform) ->
  $ionicPlatform.ready ->
    if window.StatusBar
      StatusBar.styleDefault()
    return
  return
