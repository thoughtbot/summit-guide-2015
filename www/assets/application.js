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
        zoom: 16,
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
      name: "Tour the US Mint",
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
      name: "Rockies at Coors Field",
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
    }, {
      name: "Hike at Chautauqua Park",
      address: "900 Baseline Rd, Boulder, CO",
      coordinates: {
        lat: 39.997788,
        long: -105.281371
      },
      hours: {
        open: "0600",
        close: "0900"
      },
      recommendation: {
        who: "andrew",
        why: "See the flatirons of Boulder, get in some solid hikes, hit town afterwards for a beer."
      }
    }, {
      name: "Paddle boats at Wash Park",
      address: "691 S Humboldt St",
      coordinates: {
        lat: 39.703429,
        long: -104.969344
      },
      hours: {
        open: "0900",
        close: "1900"
      },
      recommendation: {
        who: "andrew",
        why: "See one of Denver’s largest city parks from a paddle boat. Sneak some beers with you."
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
      },
      recommendation: {
        who: "joshua",
        what: "Any of the house cocktails",
        why: "Recently voted the best bar in America. Speakeasy style with an old fashioned feel."
      }
    }, {
      name: "Great Divide",
      address: "2201 Arapahoe St",
      coordinates: {
        lat: 39.753793,
        long: -104.988466
      },
      hours: {
        open: "1200",
        close: "2200"
      },
      recommendation: {
        who: "andrew",
        what: "Espresso Oak Aged Yeti",
        why: "One of the original microbreweries in Denver that has exploded. Every beer is phenomenal."
      }
    }, {
      name: "Crooked Stave",
      address: "3350 Brighton Blvd",
      coordinates: {
        lat: 39.768611,
        long: -104.979758
      },
      hours: {
        open: "1200",
        close: "2300"
      },
      recommendation: {
        who: "andrew",
        what: "Any beer",
        why: "If you love sour beers this is the place. Voted best sour brewery in the nation."
      }
    }, {
      name: "Blackshirt Brewing",
      address: "3719 Walnut St",
      coordinates: {
        lat: 39.768611,
        long: -104.979758
      },
      hours: {
        open: "1200",
        close: "2300"
      },
      recommendation: {
        who: "andrew",
        what: "Any beer",
        why: "If you love sour beers this is the place. Voted best sour brewery in the nation."
      }
    }, {
      name: "Lost Highway Brewing",
      address: "520 E Colfax Ave",
      coordinates: {
        lat: 39.739778,
        long: -104.980410
      },
      hours: {
        open: "1400",
        close: "2200"
      },
      recommendation: {
        who: "andrew",
        what: "Too many to list",
        why: "Traditional Belgian-style beers brought to you by the owners of Cheeky Monk."
      }
    }, {
      name: "Mile High Spirits & Distillery",
      address: "2201 Lawrence St",
      coordinates: {
        lat: 39.754540,
        long: -104.989276
      },
      hours: {
        open: "1500",
        close: "0200"
      },
      recommendation: {
        who: "andrew",
        what: "Denver Gold Rush",
        why: "Great atmosphere with food trucks, great cocktails made from everything distilled in house."
      }
    }, {
      name: "Grandma’s House Brewery",
      address: "1710 S Broadway",
      coordinates: {
        lat: 39.685463,
        long: -104.987172
      },
      hours: {
        open: "1400",
        close: "2000"
      },
      recommendation: {
        who: "andrew",
        what: "Red IPA",
        why: "Probably the most hipster place you’ll ever enter. It looks like your grandma’s house with rocking chairs, crochet koozies, and NES."
      }
    }, {
      name: "Blake Street Vault",
      address: "1526 Blake St",
      coordinates: {
        lat: 39.749825,
        long: -104.999620
      },
      hours: {
        open: "1100",
        close: "2400"
      },
      recommendation: {
        who: "sean",
        what: "The sweet potato fries are really good"
      }
    }, {
      name: "Stem Ciders",
      address: "2811 Walnut St",
      coordinates: {
        lat: 39.761635,
        long: -104.983791
      },
      hours: {
        open: "1600",
        close: "2200"
      },
      recommendation: {
        who: "elliot",
        what: "Ciders are all the rage and this place has some good ones. It's tiny inside but well worth it, and the owners are cool."
      }
    }
  ];

  localStorage.setItem("bars", JSON.stringify(bars));

}).call(this);

(function() {
  var coffeeshops;

  coffeeshops = [
    {
      name: "Novo Coffee",
      address: "1600 Glenarm Pl",
      coordinates: {
        lat: 39.744037,
        long: -104.989616
      },
      hours: {
        open: "0630",
        close: "1900"
      },
      recommendation: {
        who: "joshua",
        why: "thoughtbot Denver's coffee walk destination."
      }
    }, {
      name: "Little Owl",
      address: "1555 Blake Street #150",
      coordinates: {
        lat: 39.750557,
        long: -104.999627
      },
      hours: {
        open: "0700",
        close: "1700"
      },
      recommendation: {
        who: "rachel",
        why: "Really good coffee and it's adorable."
      }
    }, {
      name: "Crema",
      address: "2862 Larimer St",
      coordinates: {
        lat: 39.761088,
        long: -104.981681
      },
      hours: {
        open: "0700",
        close: "1800"
      },
      recommendation: {
        who: "andrew",
        why: "Artsy RiNo spot with great coffee and numerous local roasters available."
      }
    }, {
      name: "Huckleberry Roasters",
      address: "2500 Larimer St, Denver",
      coordinates: {
        lat: 39.7576094,
        long: -104.9862842
      },
      hours: {
        open: "0700",
        close: "1800"
      },
      recommendation: {
        who: "andrew",
        why: "Local roaster with fantastic beans. Definitely worth picking up a bag."
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
      },
      recommendation: {
        who: "joshua",
        why: "What a modern, professional & friendly dispensary should be."
      }
    }, {
      name: "Natural Remedies",
      address: "1620 Market St., Suite 5W",
      coordinates: {
        lat: 39.750052,
        long: -104.997616
      },
      hours: {
        open: "1000",
        close: "1900"
      },
      recommendation: {
        who: "andrew",
        why: "For being downtown the prices aren’t horrible."
      }
    }, {
      name: "The Clinic Highlands",
      address: "3460 W. 32nd Ave.",
      coordinates: {
        lat: 39.761941,
        long: -105.033694
      },
      hours: {
        open: "0900",
        close: "1900"
      },
      recommendation: {
        who: "andrew",
        why: "Right in West Highland with great quality product and a nice staff."
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
    }, {
      name: "Little Man Ice Cream",
      address: "2620 16th St",
      coordinates: {
        lat: 39.742870,
        long: -104.990508
      },
      hours: {
        open: "1100",
        close: "2400"
      },
      recommendation: {
        who: "rachel",
        why: "Best ice cream in town. Expect a long line."
      }
    }, {
      name: "Cigars on 6th",
      address: "707 E 6th Ave",
      coordinates: {
        lat: 39.725802,
        long: -104.978427
      },
      hours: {
        open: "1000",
        close: "1700"
      },
      recommendation: {
        who: "sean",
        why: "Good selection and a really good barber too."
      }
    }, {
      name: "Topo",
      address: "2500 Larimer St",
      coordinates: {
        lat: 39.7577094,
        long: -104.9861642
      },
      hours: {
        open: "1100",
        close: "1800"
      },
      recommendation: {
        who: "rachel",
        why: "This place will make you want to go camping! Hip, Colorado-style clothing, bags, and accessories. (Plus it’s  a shipping container!)"
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
      },
      recommendation: {
        who: "joshua",
        why: "The closest thing Denver has to a Japantown. It's small but charming."
      }
    }, {
      name: "Union Station",
      address: "17th & Wynkoop St",
      coordinates: {
        lat: 39.752838,
        long: -104.999699
      },
      recommendation: {
        who: "joshua",
        why: "Fantastic architecture from over a hundred years ago with lots of upscale restaurants."
      }
    }, {
      name: "West Highland",
      address: "32nd & Perry St",
      coordinates: {
        lat: 39.762118,
        long: -105.039297
      },
      recommendation: {
        who: "andrew",
        why: "Great restaurants, small shops, beautiful historic homes."
      }
    }, {
      name: "Wash Park",
      address: "Virginia Ave & Downing St",
      coordinates: {
        lat: 39.707482,
        long: -104.973388
      },
      recommendation: {
        who: "andrew",
        why: "Beautiful park with a huge loop for walking. Beautiful homes that you wish you could afford."
      }
    }, {
      name: "LoHi",
      address: "15th St & Central",
      coordinates: {
        lat: 39.757390,
        long: -105.010488
      },
      recommendation: {
        who: "andrew",
        why: "Hip neighborhood with great restaurants, bars, and beautiful people."
      }
    }, {
      name: "RiNo",
      address: "Larimer & 25th",
      coordinates: {
        lat: 39.757627,
        long: -104.986537
      },
      recommendation: {
        who: "andrew",
        why: "Denver’s art district. Tons of galleries, breweries, distilleries."
      }
    }, {
      name: "Berkeley",
      address: "38th & Tennyson St",
      coordinates: {
        lat: 39.769373,
        long: -105.044009
      },
      recommendation: {
        who: "andrew",
        why: "Great restaurants and bars on the up and coming Tennyson St."
      }
    }, {
      name: "Baker",
      address: "S Broadway & 3rd Ave",
      coordinates: {
        lat: 39.720942,
        long: -104.987508
      },
      recommendation: {
        who: "andrew",
        why: "Bars, Breweries, and The Green Mile."
      }
    }, {
      name: "Cap Hill",
      address: "13th Ave & Logan St",
      coordinates: {
        lat: 39.736882,
        long: -104.982292
      },
      recommendation: {
        who: "andrew",
        why: "Tons of great restaurants, bars, and more through out this neighborhood."
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
        who: "corwin",
        what: "The Franklin",
        why: "Fresh made biscuits, fried chicken, what more is there to want?"
      }
    }, {
      name: "Illegal Pete's",
      address: "1530 16th St",
      coordinates: {
        lat: 39.750870,
        long: -104.999999
      },
      hours: {
        open: "0700",
        close: "2400"
      },
      recommendation: {
        who: "joshua",
        what: "A giant burrito",
        why: "Authentically Denver. The line moves fast."
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
      },
      recommendation: {
        who: "elliot",
        why: "It's a hip spot in Uptown with a welcoming atmosphere. Eat, drink, laugh, and if you get bored, play some ping pong."
      }
    }, {
      name: "D Bar",
      address: "19th & Pennsylvania St",
      coordinates: {
        lat: 39.746184,
        long: -104.981086
      },
      hours: {
        open: "1100",
        close: "2200"
      },
      recommendation: {
        who: "amy",
        what: "Amazing Desserts! Try the fresh churros with chocolate dip."
      }
    }, {
      name: "Denver Pizza Company",
      address: "309 W 11th Ave",
      coordinates: {
        lat: 39.734038,
        long: -104.992046
      },
      hours: {
        open: "1100",
        close: "2200"
      },
      recommendation: {
        who: "amy",
        what: "Get the 5280 pizza. Soooo good."
      }
    }, {
      name: "City O City",
      address: "206 E 13th Ave",
      coordinates: {
        lat: 39.736647,
        long: -104.984549
      },
      hours: {
        open: "0700",
        close: "1400"
      },
      recommendation: {
        who: "joshua",
        why: "Homestyle vegetarian spot with quite a few vegan options too."
      }
    }, {
      name: "Sams No. 3",
      address: "1500 Curtis Street",
      coordinates: {
        lat: 39.736647,
        long: -104.984549
      },
      hours: {
        open: "1730",
        close: "2300"
      },
      recommendation: {
        who: "andrew",
        what: "Everything",
        why: "HUGE portions. Featured on Diners Drive-ins and Dives. Probably the best diner in Denver."
      }
    }, {
      name: "Larkburger",
      address: "1617 California St",
      coordinates: {
        lat: 39.745693,
        long: -104.992055
      },
      hours: {
        open: "1100",
        close: "1700"
      },
      recommendation: {
        who: "andrew",
        what: "Parmesan Truffle Fries",
        why: "A burger that’s very Colorado with all natural ingredients and great meat."
      }
    }, {
      name: "Linger",
      address: "2030 W 30th Ave",
      coordinates: {
        lat: 39.759456,
        long: -105.011358
      },
      hours: {
        open: "1100",
        close: "1700"
      },
      recommendation: {
        who: "rachel",
        why: "Old mortuary that is now one of the best restaurants in Denver."
      }
    }, {
      name: "Hops & Pie",
      address: "3920 Tennyson St",
      coordinates: {
        lat: 39.771347,
        long: -105.043775
      },
      hours: {
        open: "1130",
        close: "2300"
      },
      recommendation: {
        who: "andrew",
        what: "Slice of the day",
        why: "Best place to try rare craft beers and eat crazy pizza slices that change daily."
      }
    }, {
      name: "Biju’s Little Curry Shop",
      address: "1441 26th St",
      coordinates: {
        lat: 39.759525,
        long: -104.986551
      },
      hours: {
        open: "1100",
        close: "2100"
      },
      recommendation: {
        who: "andrew",
        why: "Fantastic curry by one of the top pro cycling chefs in the world. Healthy and absurdly delicious."
      }
    }, {
      name: "Zoe Ma Ma’s",
      address: "1625 Wynkoop St",
      coordinates: {
        lat: 39.752168,
        long: -105.000720
      },
      hours: {
        open: "1100",
        close: "2000"
      },
      recommendation: {
        who: "andrew",
        what: "Za Jiang Mian",
        why: "Some of the best authentic Chinese food in Denver, and right next to Union Station!"
      }
    }, {
      name: "Kitchen Next Door",
      address: "1701 Wynkoop St",
      coordinates: {
        lat: 39.753122,
        long: -105.000145
      },
      hours: {
        open: "1100",
        close: "2300"
      },
      recommendation: {
        who: "andrew",
        what: "Salmon Salad Sandwich & Garlic Smashersn",
        why: "Very Colorado. Healthy food, great prices, and solid beer choices."
      }
    }, {
      name: "Avanti",
      address: "3200 Pecos St",
      coordinates: {
        lat: 39.762246,
        long: -105.006119
      },
      hours: {
        open: "1100",
        close: "0200"
      },
      recommendation: {
        who: "corwin",
        what: "Arepas",
        why: "Good street food in a trendy environemnt. One of the best views in Denver."
      }
    }, {
      name: "Gaetano’s Italian Restaurant",
      address: "3760 Tejon St",
      coordinates: {
        lat: 39.769083,
        long: -105.010928
      },
      hours: {
        open: "1100",
        close: "2400"
      },
      recommendation: {
        who: "andrew",
        what: "Lasagne",
        why: "The hip Highlands neighborhood used to be the home of the Italian mafia in Denver. This restaurant was a central hub for their operations."
      }
    }, {
      name: "Rosenberg’s Bagels",
      address: "725 E 26th Ave",
      coordinates: {
        lat: 39.754811,
        long: -104.977389
      },
      hours: {
        open: "0600",
        close: "1500"
      },
      recommendation: {
        who: "andrew",
        what: "Taylor Pork Roll, Cheddar Cheese, Fried Egg, Everything Bagel Sandwich",
        why: "The best bagels outside of NYC. He molecularly changes the water to match NYC’s."
      }
    }, {
      name: "Brava! Pizzeria della Strada",
      address: "1601 Arapahoe St",
      coordinates: {
        lat: 39.748099,
        long: -104.995687
      },
      hours: {
        open: "1100",
        close: "1500"
      },
      recommendation: {
        who: "joshua",
        what: "Fun Guy pizza with truffle oil",
        why: "Get some fresh air and enjoy some great wood-fired pizza."
      }
    }, {
      name: "Snooze",
      address: "2262 Larimer St",
      coordinates: {
        lat: 39.755494,
        long: -104.988906
      },
      hours: {
        open: "0630",
        close: "1430"
      },
      recommendation: {
        who: "joshua",
        why: "A hipster favorite. There's always a crowd, so go early."
      }
    }, {
      name: "Biker Jim's Gourmet Dogs",
      address: "2148 Larimer St",
      coordinates: {
        lat: 39.7544491,
        long: -104.9902803
      },
      hours: {
        open: "1100",
        close: "2000"
      },
      recommendation: {
        who: "elliot",
        why: "A Denver staple. Put on your culinary adventurer hat and try some exotic offerings like rattlesnake, pheasant, and elk."
      }
    }
  ];

  localStorage.setItem("restaurants", JSON.stringify(restaurants));

}).call(this);
