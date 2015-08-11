dispensaries = [
  {
    name: "Native Roots"
    address: "1555 Champa St"
    coordinates:
      lat: 39.746395
      long: -104.994421
    hours:
      open: "0900"
      close: "1900"
    recommendation:
      who: "andrew"
      why: "Nice atmosphere showcasing what a modern dispensary in Colorado is."
  }
  {
    name: "Natural Remedies"
    address: "1620 Market St., Suite 5W"
    coordinates:
      lat: 39.750052
      long: -104.997616
    hours:
      open: "1000"
      close: "1900"
    recommendation:
      who: "andrew"
      why: "For being downtown the prices aren’t horrible."
  }
  {
    name: "The Clinic Highlands"
    address: "3460 W. 32nd Ave."
    coordinates:
      lat: 39.761941
      long: -105.033694
    hours:
      open: "0900"
      close: "1900"
    recommendation:
      who: "andrew"
      why: "Right in West Highland with great quality product and a nice staff."
  }
]

localStorage.setItem("dispensaries", JSON.stringify(dispensaries))
