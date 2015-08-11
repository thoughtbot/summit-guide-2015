neighborhoods = [
  {
    name: "Sakura Square"
    address: "19th St & Lawrence St"
    coordinates:
      lat: 39.751747
      long: -104.993086
    recommendation:
      who: "joshua"
      why: "The closest thing Denver has to a Japantown. It's small but charming."
  }
  {
    name: "Union Station"
    address: "17th & Wynkoop St"
    coordinates:
      lat: 39.752838
      long: -104.999699
    recommendation:
      who: "joshua"
      why: "Fantastic architecture from over a hundred years ago with lots of upscale restaurants."
  }
  {
    name: "West Highland"
    address: "32nd & Perry St"
    coordinates:
      lat: 39.762118
      long: -105.039297
    recommendation:
      who: "andrew"
      why: "Great restaurants, small shops, beautiful historic homes."
  }
  {
    name: "Wash Park"
    address: "Virginia Ave & Downing St"
    coordinates:
      lat: 39.707482
      long: -104.973388
    recommendation:
      who: "andrew"
      why: "Beautiful park with a huge loop for walking. Beautiful homes that you wish you could afford."
  }
  {
    name: "LoHi"
    address: "15th St & Central"
    coordinates:
      lat: 39.757390
      long: -105.010488
    recommendation:
      who: "andrew"
      why: "Hip neighborhood with great restaurants, bars, and beautiful people."
  }
  {
    name: "RiNo"
    address: "Larimer & 25th"
    coordinates:
      lat: 39.757627
      long: -104.986537
    recommendation:
      who: "andrew"
      why: "Denver’s art district. Tons of galleries, breweries, distilleries."
  }
  {
    name: "Berkeley"
    address: "38th & Tennyson St"
    coordinates:
      lat: 39.769373
      long: -105.044009
    recommendation:
      who: "andrew"
      why: "Great restaurants and bars on the up and coming Tennyson St."
  }
  {
    name: "Baker"
    address: "S Broadway & 3rd Ave"
    coordinates:
      lat: 39.720942
      long: -104.987508
    recommendation:
      who: "andrew"
      why: "Bars, Breweries, and The Green Mile."
  }
  {
    name: "Cap Hill"
    address: "13th Ave & Logan St"
    coordinates:
      lat: 39.736882
      long: -104.982292
    recommendation:
      who: "andrew"
      why: "Tons of great restaurants, bars, and more through out this neighborhood."
  }
]

localStorage.setItem("neighborhoods", JSON.stringify(neighborhoods))
