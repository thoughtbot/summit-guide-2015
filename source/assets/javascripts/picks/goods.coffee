goods = [
  {
    name: "I Heart Denver"
    address: "500 16th Street"
    coordinates:
      lat: 39.742870
      long: -104.990508
    hours:
      open: "1000"
      close: "2000"
  }
  {
    name: "Little Man Ice Cream"
    address: "2620 16th St"
    coordinates:
      lat: 39.742870
      long: -104.990508
    hours:
      open: "1100"
      close: "2400"
    recommendation:
      who: "rachel"
      why: "Best ice cream in town. Expect a long line."
  }
]

localStorage.setItem("goods", JSON.stringify(goods))
