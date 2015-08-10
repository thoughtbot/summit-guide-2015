activities = [
  {
    name: "US Mint"
    address: "320 W Colfax Ave"
    coordinates:
      lat: 39.739338
      long: -104.992341
    hours:
      open: "800"
      close: "1530"
  }
  {
    name: "Coors Field"
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
]

localStorage.setItem("activities", JSON.stringify(activities))
