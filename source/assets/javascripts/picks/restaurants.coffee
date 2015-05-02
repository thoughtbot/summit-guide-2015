restaurants = [
  {
    name: "Denver Biscuit Co"
    address: "5412 S. Broadway St"
    coordinates:
      lat: 39.794618
      long: -104.987326
    hours:
      open: "0900"
      close: "2300"
    recommendation:
      by: "corwin"
      name: "The Franklin"
      why: "Fresh made biscuits, fried chicken, what more is there to want?"
  }
  {
    name: "Illegal Pete's"
    address: "1530 16th St #101"
    coordinates:
      lat: 39.750870
      long: -104.999999
    hours:
      open: "0700"
      close: "2400"
    recommendation:
      by: "joshua"
      name: "The Big Potato"
      why: "The best burritos in town. The line is long but it moves quick."
  }
]

localStorage.setItem("restaurants", JSON.stringify(restaurants))
