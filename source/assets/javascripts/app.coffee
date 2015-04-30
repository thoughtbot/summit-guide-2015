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
        controller: "PicksController"

      .state "list",
        url: "/picks/:list"
        templateUrl: "templates/list.html"
        controller: "ListController"
        resolve:
          list: ($stateParams, PicksService) ->
            PicksService.get($stateParams.list)

      .state "summit",
        url: "/summit"
        templateUrl: "templates/summit.html"

      .state "health",
        url: "/health"
        templateUrl: "templates/health.html"

      .state "welcome",
        url: "/welcome"
        templateUrl: "templates/welcome.html"

    $urlRouterProvider.otherwise("/")

    $ionicConfigProvider.tabs.position("bottom")
    $ionicConfigProvider.backButton.text("").icon("ion-arrow-left-c")
    $ionicConfigProvider.views.transition('ios')
    $ionicConfigProvider.navBar.transition('android')
