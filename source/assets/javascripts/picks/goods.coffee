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
  {
    name: "Cigars on 6th"
    address: "707 E 6th Ave"
    coordinates:
      lat: 39.725802
      long: -104.978427
    hours:
      open: "1000"
      close: "1700"
    recommendation:
      who: "sean"
      why: "Good selection and a really good barber too."
  }
]

localStorage.setItem("goods", JSON.stringify(goods))
