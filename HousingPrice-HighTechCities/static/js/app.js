// function buildMetadata(sample) {
//   // @TODO: Complete the following function that builds the metadata panel

//   // Use `d3.json` to fetch the metadata for a sample
//   d3.json(`/metadata/${sample}`).then((sampledata) => {
//   });
// };


// function buildCharts(sample) {

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
//   d3.json(`/samples/${sample}`).then((sampledata) => {
    
//   });
// };


// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/names").then((sampleNames) => {

//   });
// };


// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// };

// // Initialize the dashboard
// init();
