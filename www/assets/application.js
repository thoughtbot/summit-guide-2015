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
      "0900-1745": "Office Opens",
      "1200-1500": "Lunch in the Office",
      "1330-1800": "US Mint Tour (20 people max)",
      "1500": "Union Station",
      "1800-2200": "Welcome Dinner & Billiards @ Wynkoop Brewery (1634 18th St)"
    },
    "2015-08-13": {
      "0900-1200": "Breakfast @ The Commons on Champa (1245 Champa St)",
      "0945-1200": "Lightning Talks & Chad’s Company Address @ The Commons on Champa",
      "1230-1730": "Small group activities",
      "1830": "Meet in Sheraton’s Lobby for mystery dinner assignment & head to dinner",
      "2100": "Return to Sheraton for drinks @ 16Mix Lounge"
    },
    "2015-08-14": {
      "0700-1000": "Hotel breakfast buffet @ 15|Fifty",
      "0900-1000": "Departures for excursions",
      "1840": "Rockies Baseball Game @ Coors Field"
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
  angular.module("summit-guide").service("MapService", function($filter, PicksService) {
    var addMarker, cardClick, centerMap, getMarker, initialize, map, markMap, markers_list, picks, showCard;
    picks = PicksService.all();
    markers_list = [];
    initialize = function() {
      var $element, map, mapOptions;
      mapOptions = {
        center: new google.maps.LatLng(39.746541, -104.993922),
        disableDefaultUI: true,
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
          }, {
            featureType: "transit",
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
      var coordinates, icon, marker;
      coordinates = new google.maps.LatLng(place.coordinates.lat, place.coordinates.long);
      icon = {
        url: "/assets/marker-" + list + ".png",
        size: new google.maps.Size(129, 156),
        scaledSize: new google.maps.Size(43, 52),
        anchor: new google.maps.Point(21, 52)
      };
      marker = new google.maps.Marker({
        map: map,
        position: coordinates,
        animation: google.maps.Animation.DROP,
        icon: icon,
        title: place.name
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
        lat: parseFloat(marker.position.G),
        lng: parseFloat(marker.position.K)
      });
      marker.setAnimation(google.maps.Animation.BOUNCE);
      return setTimeout(function() {
        return marker.setAnimation(null);
      }, 750);
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
      office: JSON.parse(localStorage["office"]),
      hotel: JSON.parse(localStorage["hotel"])
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
    var formatTime;
    formatTime = function(time) {
      var hour, minutes, period, split;
      split = time.match(/.{1,2}/g);
      hour = split[0];
      if (hour < 12 || hour > 23) {
        period = "AM";
      } else {
        period = "PM";
      }
      if (hour > 12) {
        hour -= 12;
      }
      hour = parseInt(hour, 10);
      minutes = split[1];
      return hour + ":" + minutes + period;
    };
    return function(time) {
      var formattedTime, i, len, times;
      if (time) {
        formattedTime = [];
        times = time.split("-");
        for (i = 0, len = times.length; i < len; i++) {
          time = times[i];
          formattedTime.push(formatTime(time));
        }
        return formattedTime.join(" to ");
      }
    };
  });

}).call(this);

(function() {
  var activities;

  activities = [
    {
      name: "US Mint",
      address: "320 W Colfax Ave",
      coordinates: {
        lat: 39.739338,
        long: -104.992341
      },
      hours: {
        open: "800",
        close: "1530"
      }
    }, {
      name: "Coors Field",
      address: "2001 Blake St",
      coordinates: {
        lat: 39.755882,
        long: -104.994178
      }
    }, {
      name: "Commons on Champa",
      address: "1245 Champa St",
      coordinates: {
        lat: 39.743656,
        long: -104.998167
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
    }, {
      name: "Novo Coffee",
      address: "1600 Glenarm Pl",
      coordinates: {
        lat: 39.744037,
        long: -104.989616
      },
      hours: {
        open: "0630",
        close: "1900"
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
  var hotel;

  hotel = [
    {
      name: "Sheraton Downtown Denver",
      address: "1550 Court Pl",
      coordinates: {
        lat: 39.742063,
        long: -104.988845
      }
    }
  ];

  localStorage.setItem("hotel", JSON.stringify(hotel));

}).call(this);

(function() {
  var neighborhoods;

  neighborhoods = [
    {
      name: "Sakura Square",
      address: "19th St & Lawrence St",
      coordinates: {
        lat: 39.751747,
        long: -104.993086
      }
    }, {
      name: "Union Station",
      address: "17th & Wynkoop St",
      coordinates: {
        lat: 39.752838,
        long: -104.999699
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
      }
    }, {
      name: "Wynkoop Brewery",
      address: "1634 18th St",
      coordinates: {
        lat: 39.753394,
        long: -104.998427
      },
      hours: {
        open: "1100",
        close: "0200"
      }
    }, {
      name: "Ace",
      address: "501 E 17th Ave",
      coordinates: {
        lat: 39.743502,
        long: -104.980749
      },
      hours: {
        open: "1100",
        close: "2400"
      }
    }
  ];

  localStorage.setItem("restaurants", JSON.stringify(restaurants));

}).call(this);
