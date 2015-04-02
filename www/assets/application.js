(function() {
  angular.module("summit-guide", ["ionic"]).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

}).call(this);

(function() {
  angular.module("summit-guide").controller("MapCtrl", function($scope, $ionicLoading) {
    $scope.mapCreated = function(map) {
      $scope.map = map;
    };
    $scope.centerOnMe = function() {
      console.log("Centering");
      if (!$scope.map) {
        return;
      }
      $scope.loading = $ionicLoading.show({
        content: "Getting current location...",
        showBackdrop: false
      });
      navigator.geolocation.getCurrentPosition((function(pos) {
        console.log("Got pos", pos);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
      }), function(error) {
        alert("Unable to get location: " + error.message);
      });
    };
  });

}).call(this);

(function() {
  angular.module("summit-guide").directive("appHeader", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      templateUrl: "templates/_header.html"
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
  angular.module("summit-guide").directive("map", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {
        onCreate: "&"
      },
      link: function($scope, $element, $attr) {
        var initialize;
        initialize = function() {
          var map, mapOptions;
          mapOptions = {
            center: new google.maps.LatLng(43.07493, -89.381388),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map($element[0], mapOptions);
          $scope.onCreate({
            map: map
          });
          google.maps.event.addDomListener($element[0], "mousedown", function(e) {
            e.preventDefault();
            return false;
          });
        };
        if (document.readyState === "complete") {
          initialize();
        } else {
          google.maps.event.addDomListener(window, "load", initialize);
        }
      }
    };
  });

}).call(this);
