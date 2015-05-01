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
]

localStorage.setItem("goods", JSON.stringify(goods))
