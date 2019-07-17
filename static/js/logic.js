// Creating map object
var map = L.map("map", {
  center: [37.5, -80],
  zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "https://raw.githubusercontent.com/emreynolds9/Project-2/master/Resources/2001.geojson";

var geojson;

// Grab data with d3
d3.json(link, function(data) {

  // console.log(data)
  
    // Create a new choropleth layer
  geojson = L.choropleth(data, {  
    valueProperty: "HOME_VALUE",// Define what  property in the features to use
    scale: ["#ffffb2", "#b10026"],// Set color scale
    steps: 10, // Number of breaks in step range
    mode: "q",// q for quartile, e for equidistant, k for k-means
    style: {
      // Border color
      color: "#000",
      weight: 1,
      fillOpacity: 0.9
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.NAME + ", " + feature.properties.STATE_NAME + "<br>Median Home Value:<br>" +
       "$" + feature.properties.HOME_VALUE);
    }
  }).addTo(map);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

  //   // Add min & max
    var legendInfo = "<h1>Median Home Value (per sq foot)</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(map);

});

// Create two separate layer groups below. One for city markers, and one for states markers
var cityLayer = L.layerGroup(cityMarkers);
var stateLayer = L.layerGroup(stateMarkers);


// Create a baseMaps object to contain the streetmap and darkmap
var baseMaps = {
  Street: streetmap,
  Dark: darkmap
};

// Create an overlayMaps object here to contain the "State Population" and "City Population" layers
var overlayMaps = {
  Cities: cityLayer,
  States: stateLayer
};

// Modify the map so that it will have the streetmap, states, and cities layers
var myMap = L.map("map", {
  center: [35.2276, -95.2137],
  zoom: 4,
  layers: [streetmap,stateLayer,cityLayer]
});

// Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);