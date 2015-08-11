bars = [
  {
    name: "Williams and Graham"
    address: "3160 Tejon St"
    coordinates:
      lat: 39.761873
      long: -105.011013
    hours:
      open: "1700"
      close: "0100"
    recommendation:
      who: "joshua"
      what: "Any of the house cocktails"
      why: "Recently voted the best bar in America. Speakeasy style with an old fashioned feel."
  }
  {
    name: "Great Divide"
    address: "2201 Arapahoe St"
    coordinates:
      lat: 39.753793
      long: -104.988466
    hours:
      open: "1200"
      close: "2200"
    recommendation:
      who: "andrew"
      what: "Espresso Oak Aged Yeti"
      why: "One of the original microbreweries in Denver that has exploded. Every beer is phenomenal."
  }
  {
    name: "Crooked Stave"
    address: "3350 Brighton Blvd"
    coordinates:
      lat: 39.768611
      long: -104.979758
    hours:
      open: "1200"
      close: "2300"
    recommendation:
      who: "andrew"
      what: "Any beer"
      why: "If you love sour beers this is the place. Voted best sour brewery in the nation."
  }
  {
    name: "Blackshirt Brewing"
    address: "3719 Walnut St"
    coordinates:
      lat: 39.769858
      long: -104.972962
    hours:
      open: "1200"
      close: "2300"
    recommendation:
      who: "andrew"
      what: "Any beer"
      why: "They are currently doing ONLY red ale based beers. The brewery has a different vibe and that’s a good thing."
  }
  {
    name: "Lost Highway Brewing"
    address: "520 E Colfax Ave"
    coordinates:
      lat: 39.739778
      long: -104.980410
    hours:
      open: "1400"
      close: "2200"
    recommendation:
      who: "andrew"
      what: "Too many to list"
      why: "Traditional Belgian-style beers brought to you by the owners of Cheeky Monk."
  }
  {
    name: "Mile High Spirits & Distillery"
    address: "2201 Lawrence St"
    coordinates:
      lat: 39.754540
      long: -104.989276
    hours:
      open: "1500"
      close: "0200"
    recommendation:
      who: "andrew"
      what: "Denver Gold Rush"
      why: "Great atmosphere with food trucks, great cocktails made from everything distilled in house."
  }
  {
    name: "Grandma’s House Brewery"
    address: "1710 S Broadway"
    coordinates:
      lat: 39.685463
      long: -104.987172
    hours:
      open: "1400"
      close: "2000"
    recommendation:
      who: "andrew"
      what: "Red IPA"
      why: "Probably the most hipster place you’ll ever enter. It looks like your grandma’s house with rocking chairs, crochet koozies, and NES."
  }
  {
    name: "Blake Street Vault"
    address: "1526 Blake St"
    coordinates:
      lat: 39.749825
      long: -104.999620
    hours:
      open: "1100"
      close: "2400"
    recommendation:
      who: "sean"
      what: "The sweet potato fries are really good"
  }
  {
    name: "Stem Ciders"
    address: "2811 Walnut St"
    coordinates:
      lat: 39.761635
      long: -104.983791
    hours:
      open: "1600"
      close: "2200"
    recommendation:
      who: "elliot"
      what: "Ciders are all the rage and this place has some good ones. It's tiny inside but well worth it, and the owners are cool."
  }
]

localStorage.setItem("bars", JSON.stringify(bars))
