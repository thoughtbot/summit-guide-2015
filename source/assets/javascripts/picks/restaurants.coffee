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
  }
  {
    name: "Wynkoop Brewery"
    address: "1634 18th St"
    coordinates:
      lat: 39.753394
      long: -104.998427
    hours:
      open: "1100"
      close: "0200"
  }
  {
    name: "Ace"
    address: "501 E 17th Ave"
    coordinates:
      lat: 39.743502
      long: -104.980749
    hours:
      open: "1100"
      close: "2400"
  }
]

localStorage.setItem("restaurants", JSON.stringify(restaurants))
