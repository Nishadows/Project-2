var sliderControl = null;

// Creating map object
var map = L.map("map", {
  center: [38.75, -77.5],
  zoom: 9
});

// Adding tile layer
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }
).addTo(map);

var link =
  "https://raw.githubusercontent.com/emreynolds9/Project-2/master/Resources/2000.geojson";

var geojson;

// This is for mouseover

d3.json(link, function(data) {
  // console.log(data)

  // Create a new choropleth layer
  geojson = L.choropleth(data, {
    valueProperty: "HOME_VALUE", // Define what  property in the features to use
    scale: ["#ffffb2", "#b10026"], // Set color scale
    steps: 10, // Number of breaks in step range
    mode: "q", // q for quartile, e for equidistant, k for k-means
    style: {
      // Border color
      color: "#000",
      weight: 1,
      fillOpacity: 0.9
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        feature.properties.NAME +
          ", " +
          feature.properties.STATE_NAME +
          "<br>Median Home Value:<br>" +
          "$" +
          feature.properties.HOME_VALUE
      );
    },
    time: "2000"
  }).addTo(map);
  // console.log(geojson)

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    //   // Add min & max
    var legendInfo =
      "<h1>Median Home Value (per sq foot)</h1>" +
      '<div class="labels">' +
      '<div class="min">' +
      limits[0] +
      "</div>" +
      '<div class="max">' +
      limits[limits.length - 1] +
      "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>');
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(map);
});
var geojson2;

link2 =
  "https://raw.githubusercontent.com/emreynolds9/Project-2/master/Resources/2015.geojson";

d3.json(link2, function(data) {
  // console.log(data)

  // Create a new choropleth layer
  geojson2 = L.choropleth(data, {
    valueProperty: "HOME_VALUE", // Define what  property in the features to use
    scale: ["#ffffb2", "#b10026"], // Set color scale
    steps: 10, // Number of breaks in step range
    mode: "q", // q for quartile, e for equidistant, k for k-means
    style: {
      // Border color
      color: "#000",
      weight: 1,
      fillOpacity: 0.9
    },
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        feature.properties.NAME +
          ", " +
          feature.properties.STATE_NAME +
          "<br>Median Home Value:<br>" +
          "$" +
          feature.properties.HOME_VALUE
      );
    console.log(geojson2)
      
    },
    time: "2015"
  }).addTo(map);


  //Create a marker layer (in the example done via a GeoJSON FeatureCollection)
  var sliderControl = L.control.sliderControl({
    position: "topright",
    layer: layerGroup,
    follow: 3
  });

  //Make sure to add the slider to the map ;-)
  map.addControl(sliderControl);

  //And initialize the slider
  sliderControl.startSlider();

  // $('#slider-timestamp').html(options.markers[ui.value].feature.properties.time.substr(2000, 2019));
});

function highlight(e) {
  // e for event
  // The target event property returns the element that triggered the event.
  // Get access to the layer and set a grey border on it
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.5
  });
  layer.bringToFront();
  // Send information to the info class defined below:
  info.update(layer.feature.properties);
}

// This is for mouseout: return to normal style
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  // Senf information to the info class defined below:
  info.update();
}

function addToFeature(feature, layer) {
  // Grab the layer and describe listeners
  layer.on({
    mouseover: highlight,
    mouseout: resetHighlight
  });
}

// Custom info Control
var info = L.control();
info.onAdd = function(map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};


function makeLayer(link,year) {
  d3.json(link, function(data) {
    console.log(data)

    // Create a new choropleth layer
    return new L.choropleth(data, {
      valueProperty: "HOME_VALUE", // Define what  property in the features to use
      scale: ["#ffffb2", "#b10026"], // Set color scale
      steps: 10, // Number of breaks in step range
      mode: "q", // q for quartile, e for equidistant, k for k-means
      style: {
        // Border color
        color: "#000",
        weight: 1,
        fillOpacity: 0.9
      },

      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          feature.properties.NAME +
            ", " +
            feature.properties.STATE_NAME +
            "<br>Median Home Value:<br>" +
            "$" +
            feature.properties.HOME_VALUE
        );
      },
      time: year
    });
    // Set up the legend
  });

}

var emily = makeLayer("https://raw.githubusercontent.com/emreynolds9/Project-2/master/Resources/2016.geojson","2016")
console.log(emily)
var layerGroup = L.layerGroup([geojson, geojson2, emily]);
