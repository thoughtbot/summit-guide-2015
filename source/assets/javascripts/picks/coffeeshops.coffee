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
      by: "Joshua"
  }
]

localStorage.setItem("coffeeshops", JSON.stringify(coffeeshops))
