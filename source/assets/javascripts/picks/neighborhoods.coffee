neighborhoods = [
  {
    name: "Sakura Square"
    address: "19th St & Lawrence St"
    coordinates:
      lat: 39.751747
      long: -104.993086
  }
  {
    name: "Union Station"
    address: "17th & Wynkoop St"
    coordinates:
      lat: 39.752838
      long: -104.999699
  }
]

localStorage.setItem("neighborhoods", JSON.stringify(neighborhoods))
