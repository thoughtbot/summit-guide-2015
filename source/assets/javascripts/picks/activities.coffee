activities = [
  {
    name: "Tour the US Mint"
    address: "320 W Colfax Ave"
    coordinates:
      lat: 39.739338
      long: -104.992341
    hours:
      open: "800"
      close: "1530"
  }
  {
    name: "Rockies at Coors Field"
    address: "2001 Blake St"
    coordinates:
      lat: 39.755882
      long: -104.994178
  }
  {
    name: "Commons on Champa"
    address: "1245 Champa St"
    coordinates:
      lat: 39.743656
      long: -104.998167
  }
  {
    name: "Hike at Chautauqua Park"
    address: "900 Baseline Rd, Boulder, CO"
    coordinates:
      lat: 39.997788
      long: -105.281371
    hours:
      open: "0600"
      close: "0900"
    recommendation:
      who: "andrew"
      why: "See the flatirons of Boulder, get in some solid hikes, hit town afterwards for a beer."
  }
  {
    name: "Paddle boats at Wash Park"
    address: "691 S Humboldt St"
    coordinates:
      lat: 39.703429
      long: -104.969344
    hours:
      open: "0900"
      close: "1900"
    recommendation:
      who: "andrew"
      why: "See one of Denver’s largest city parks from a paddle boat. Sneak some beers with you."
  }
]

localStorage.setItem("activities", JSON.stringify(activities))
