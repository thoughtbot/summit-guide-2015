(function() {
  angular.module("summit-guide", ["ionic"]).run(function($ionicPlatform) {}).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state("explore", {
      url: "/",
      templateUrl: "templates/explore.html",
      controller: "ExploreController"
    }).state("picks", {
      url: "/picks",
      templateUrl: "templates/picks.html",
      controller: "PicksController"
    }).state("list", {
      url: "/picks/:list",
      templateUrl: "templates/list.html",
      controller: "ListController",
      resolve: {
        list: function($stateParams, PicksService) {
          return PicksService.get($stateParams.list);
        }
      }
    }).state("summit", {
      url: "/summit",
      templateUrl: "templates/summit.html",
      controller: "SummitController"
    }).state("health", {
      url: "/health",
      templateUrl: "templates/health.html"
    }).state("welcome", {
      url: "/welcome",
      templateUrl: "templates/welcome.html"
    });
    $urlRouterProvider.otherwise("/");
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.backButton.text("").icon("ion-arrow-left-c");
    $ionicConfigProvider.views.transition('ios');
    return $ionicConfigProvider.navBar.transition('android');
  });

}).call(this);

(function() {
  var schedule;

  schedule = {
    "2015-08-12": {
      "0900": "Breakfast & Coffee",
      "1000": "Lightning Talks",
      "1130": "Snack Time",
      "1230": "Hangout",
      "1300": "Lunch @ Snarfs",
      "1400": "Lightning Talks",
      "1500": "Games",
      "1600": "Relax",
      "1730": "Happy Hour",
      "1900": "Dinner",
      "2200": "Party!"
    },
    "2015-08-13": {
      "0900": "Breakfast & Coffee",
      "1000": "Lightning Talks",
      "1130": "Snack Time",
      "1230": "Hangout",
      "1300": "Lunch @ Snarfs",
      "1400": "Lightning Talks",
      "1500": "Games",
      "1600": "Relax",
      "1730": "Happy Hour",
      "1900": "Dinner",
      "2200": "Party!"
    },
    "2015-08-14": {
      "0900": "Breakfast & Coffee",
      "1000": "Lightning Talks",
      "1130": "Snack Time",
      "1230": "Hangout",
      "1300": "Lunch @ Snarfs",
      "1400": "Lightning Talks",
      "1500": "Games",
      "1600": "Relax",
      "1730": "Happy Hour",
      "1900": "Dinner",
      "2200": "Party!"
    }
  };

  localStorage.setItem("schedule", JSON.stringify(schedule));

}).call(this);

(function() {
  angular.module("summit-guide").controller("AppController", function($scope, $ionicLoading) {});

}).call(this);

(function() {
  angular.module("summit-guide").controller("ExploreController", function($scope, PicksService, MapService) {
    var getPlaces;
    getPlaces = function(picks) {
      var array, key, list, place, places;
      array = [];
      for (list in picks) {
        places = picks[list];
        for (key in places) {
          place = places[key];
          array.push(place);
        }
      }
      return array;
    };
    return $scope.places = getPlaces(PicksService.all());
  });

}).call(this);

(function() {
  angular.module("summit-guide").controller("ListController", function($scope, $location, list, MapService) {
    $scope.list = list;
    return $scope.cardClick = function($event) {
      var card, title;
      card = $event.currentTarget;
      title = card.getElementsByTagName("h2")[0].innerHTML;
      $location.path("/explore");
      return setTimeout(function() {
        return MapService.showCard(title);
      }, 1000);
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").controller("PicksController", function($scope, PicksService) {
    return $scope.picks = PicksService.all();
  });

}).call(this);

(function() {
  angular.module("summit-guide").controller("SummitController", function($scope, ScheduleService) {
    return $scope.schedule = ScheduleService.all();
  });

}).call(this);

(function() {
  angular.module("summit-guide").directive("appNav", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      templateUrl: "templates/_nav.html"
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").directive("appToolbar", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      templateUrl: "templates/_toolbar.html"
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").service("MapService", function($filter, PicksService) {
    var addMarker, cardClick, centerMap, getMarker, initialize, map, markMap, markers_list, picks, showCard;
    picks = PicksService.all();
    markers_list = [];
    initialize = function() {
      var $element, map, mapOptions;
      mapOptions = {
        center: new google.maps.LatLng(39.746541, -104.993922),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          }
        ]
      };
      $element = document.getElementsByClassName("map")[0];
      map = new google.maps.Map($element, mapOptions);
      google.maps.event.addListenerOnce(map, "idle", function() {
        return markMap(picks, map);
      });
      return map;
    };
    markMap = function(places, map) {
      var key, list, place, results;
      results = [];
      for (list in picks) {
        places = picks[list];
        results.push((function() {
          var results1;
          results1 = [];
          for (key in places) {
            place = places[key];
            results1.push(addMarker(place, list, map));
          }
          return results1;
        })());
      }
      return results;
    };
    addMarker = function(place, list, map) {
      var coordinates, marker;
      coordinates = new google.maps.LatLng(place.coordinates.lat, place.coordinates.long);
      marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: place.name,
        icon: "/assets/" + list + "-marker.svg"
      });
      markers_list.push(marker);
      return google.maps.event.addListener(marker, "mousedown", function(e) {
        return showCard(place.name);
      });
    };
    cardClick = function($event) {
      return $event.currentTarget.classList.remove("active");
    };
    centerMap = function(marker) {
      map.panTo({
        lat: marker.position.G,
        lng: marker.position.K
      });
      marker.setAnimation(google.maps.Animation.BOUNCE);
      return setTimeout(function() {
        return marker.setAnimation(null);
      }, 700);
    };
    getMarker = function(name) {
      var activeMarker, i, len, marker;
      for (i = 0, len = markers_list.length; i < len; i++) {
        marker = markers_list[i];
        if (marker.title === name) {
          activeMarker = marker;
        }
      }
      return activeMarker;
    };
    showCard = function(name) {
      var activeCard, allCards, card, i, len, makeActive, marker, safeName;
      safeName = $filter('paramaterize')(name);
      allCards = document.getElementsByClassName("card");
      activeCard = document.querySelector(".card[data-name='" + safeName + "']");
      makeActive = !activeCard.classList.contains("active");
      for (i = 0, len = allCards.length; i < len; i++) {
        card = allCards[i];
        card.classList.remove("active");
      }
      if (makeActive) {
        activeCard.classList.add("active");
      }
      marker = getMarker(name);
      return centerMap(marker);
    };
    map = initialize();
    return {
      showCard: function(name) {
        return showCard(name);
      }
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").service("PicksService", function($http) {
    var picks;
    picks = {
      bars: JSON.parse(localStorage["bars"]),
      coffeeshops: JSON.parse(localStorage["coffeeshops"]),
      restaurants: JSON.parse(localStorage["restaurants"]),
      dispensaries: JSON.parse(localStorage["dispensaries"]),
      goods: JSON.parse(localStorage["goods"]),
      activities: JSON.parse(localStorage["activities"]),
      neighborhoods: JSON.parse(localStorage["neighborhoods"]),
      office: JSON.parse(localStorage["office"])
    };
    return {
      all: function() {
        return picks;
      },
      get: function(list) {
        return picks[list];
      }
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").service("ScheduleService", function($http) {
    var schedule;
    schedule = JSON.parse(localStorage["schedule"]);
    return {
      all: function() {
        return schedule;
      }
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").filter("paramaterize", function() {
    return function(string) {
      if (string) {
        return string.replace(/'/g, "").replace(/"/g, "").replace(/ /g, "").toLowerCase();
      }
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").filter("time", function() {
    return function(time) {
      var hours, minutes, period, split;
      if (time) {
        split = time.match(/.{1,2}/g);
        if (split[0] < 13) {
          hours = split[0];
          period = "am";
        } else {
          hours = split[0] - 12;
          period = "pm";
        }
        hours = parseInt(hours, 10);
        minutes = split[1];
        return hours + ":" + minutes + " " + period;
      }
    };
  });

}).call(this);

(function() {
  var activities;

  activities = [
    {
      name: "Oh Heck Yeah",
      address: "15th & Champa St",
      coordinates: {
        lat: 39.745616,
        long: -104.995132
      },
      hours: {
        open: "1900",
        close: "2200"
      }
    }
  ];

  localStorage.setItem("activities", JSON.stringify(activities));

}).call(this);

(function() {
  var bars;

  bars = [
    {
      name: "Williams and Graham",
      address: "3160 Tejon St",
      coordinates: {
        lat: 39.761873,
        long: -105.011013
      },
      hours: {
        open: "1700",
        close: "0100"
      }
    }
  ];

  localStorage.setItem("bars", JSON.stringify(bars));

}).call(this);

(function() {
  var coffeeshops;

  coffeeshops = [
    {
      name: "ink! Coffee",
      address: "618 16th St",
      coordinates: {
        lat: 39.744661,
        long: -104.991854
      },
      hours: {
        open: "0600",
        close: "1800"
      }
    }
  ];

  localStorage.setItem("coffeeshops", JSON.stringify(coffeeshops));

}).call(this);

(function() {
  var dispensaries;

  dispensaries = [
    {
      name: "Native Roots",
      address: "1555 Champa St",
      coordinates: {
        lat: 39.746395,
        long: -104.994421
      },
      hours: {
        open: "0900",
        close: "1900"
      }
    }
  ];

  localStorage.setItem("dispensaries", JSON.stringify(dispensaries));

}).call(this);

(function() {
  var goods;

  goods = [
    {
      name: "I Heart Denver",
      address: "500 16th Street",
      coordinates: {
        lat: 39.742870,
        long: -104.990508
      },
      hours: {
        open: "1000",
        close: "2000"
      }
    }
  ];

  localStorage.setItem("goods", JSON.stringify(goods));

}).call(this);

(function() {
  var neighborhoods;

  neighborhoods = [
    {
      name: "Uptown",
      address: "19th St & Pennsylvania St",
      coordinates: {
        lat: 39.746184,
        long: -104.981086
      }
    }
  ];

  localStorage.setItem("neighborhoods", JSON.stringify(neighborhoods));

}).call(this);

(function() {
  var office;

  office = [
    {
      name: "thoughtbot Denver",
      address: "1600 Champa St",
      coordinates: {
        lat: 39.746498,
        long: -104.993246
      }
    }
  ];

  localStorage.setItem("office", JSON.stringify(office));

}).call(this);

(function() {
  var restaurants;

  restaurants = [
    {
      name: "Denver Biscuit Co",
      address: "5412 S. Broadway St",
      coordinates: {
        lat: 39.794618,
        long: -104.987326
      },
      hours: {
        open: "0900",
        close: "2300"
      },
      recommendation: {
        by: "corwin",
        name: "The Franklin",
        why: "Fresh made biscuits, fried chicken, what more is there to want?"
      }
    }, {
      name: "Illegal Pete's",
      address: "1530 16th St #101",
      coordinates: {
        lat: 39.750870,
        long: -104.999999
      },
      hours: {
        open: "0700",
        close: "2400"
      },
      recommendation: {
        by: "joshua",
        name: "The Big Potato",
        why: "The best burritos in town. The line is long but it moves quick."
      }
    }
  ];

  localStorage.setItem("restaurants", JSON.stringify(restaurants));

}).call(this);
