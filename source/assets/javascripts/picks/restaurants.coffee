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
  {
    name: "D Bar"
    address: "19th & Pennsylvania St"
    coordinates:
      lat: 39.746184
      long: -104.981086
    hours:
      open: "1100"
      close: "2200"
    recommendation:
      by: "amy"
      name: "Amazing Desserts! Try the fresh churros with chocolate dip"
  }
  {
    name: "Denver Pizza Company"
    address: "309 W 11th Ave"
    coordinates:
      lat: 39.734038
      long: -104.992046
    hours:
      open: "1100"
      close: "2200"
    recommendation:
      by: "amy"
      name: "Get the 5280 pizza. Soooo good."
  }
]

localStorage.setItem("restaurants", JSON.stringify(restaurants))
