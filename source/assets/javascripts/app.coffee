angular.module("summit-guide", ["ionic"])
  .run ($ionicPlatform) ->
    return

  .config ($stateProvider, $urlRouterProvider, $ionicConfigProvider) ->
    $stateProvider
      .state "explore",
        url: "/"
        templateUrl: "templates/explore.html"
        controller: "ExploreController"

      .state "picks",
        url: "/picks"
        templateUrl: "templates/picks.html"

      .state "list",
        url: "/picks/:id"
        templateUrl: "templates/list.html"

      .state "summit",
        url: "/summit"
        templateUrl: "templates/summit.html"

      .state "health",
        url: "/health"
        templateUrl: "templates/health.html"

      .state "welcome",
        url: "/welcome"
        templateUrl: "templates/welcome.html"

    $urlRouterProvider.otherwise("/explore");

    $ionicConfigProvider.tabs.position("bottom");

    return
