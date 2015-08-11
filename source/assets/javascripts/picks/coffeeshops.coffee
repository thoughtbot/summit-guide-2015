coffeeshops = [
  {
    name: "ink! Coffee"
    address: "618 16th St"
    coordinates:
      lat: 39.744661
      long: -104.991854
    hours:
      open: "0600"
      close: "1800"
  }
  {
    name: "Novo Coffee"
    address: "1600 Glenarm Pl"
    coordinates:
      lat: 39.744037
      long: -104.989616
    hours:
      open: "0630"
      close: "1900"
    recommendation:
      who: "joshua"
      why: "thoughtbot Denver's coffee walk destination."
  }
  {
    name: "Little Owl"
    address: "1555 Blake Street #150"
    coordinates:
      lat: 39.750557
      long: -104.999627
    hours:
      open: "0700"
      close: "1700"
    recommendation:
      who: "rachel"
      why: "Small, great atmosphere, even better pour overs."
  }
  {
    name: "Crema"
    address: "2862 Larimer St"
    coordinates:
      lat: 39.761088
      long: -104.981681
    hours:
      open: "0700"
      close: "1800"
    recommendation:
      who: "andrew"
      why: "Artsy RiNo spot with great coffee and numerous local roasters available."
  }
  {
    name: "Huckleberry Roasters"
    address: "2500 Larimer St, Denver"
    coordinates:
      lat: 39.757667
      long: -104.986097
    hours:
      open: "0700"
      close: "1800"
    recommendation:
      who: "andrew"
      why: "Local roaster with fantastic beans. Definitely worth picking up a bag."
  }
]

localStorage.setItem("coffeeshops", JSON.stringify(coffeeshops))
