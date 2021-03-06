function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    // var samplesArray = []
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // let desiredSamples = sample.filter(sampleObj => sampleObj.id == sample);
    // console.log(desiredSamples)
    //  5. Create a variable that holds the first sample in the array.
    // var firstSample = sample_values[0];
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    // var otu_ids = metadata.filter(desiredSamples => sample.id)
    // var otu_labels = metadata.filter(samplesArray => sample.names)
    // var sample_values = metadata.filter(samplesArray => sample.wfreq)
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // var trace = {
    //   otu_ids: [],
    //   otu_labels: [],
    //   sample_values: [],
    //   type: "bar"
    // };

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // var yticks = sample_values.list.map.reverse().slice(0,10)
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // (x => x.otu_ids)

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    // var barData = [trace1]
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        t: 30,
        l: 150
      }
    };
    // 10. Use Plotly to plot the data with the layout. 

// Plotly.newPlot("sample-metadata", data, layout)
// Plotly.newPlot("bar", data, layout)
Plotly.newPlot("bar", barData, barLayout);
});
}
// // Add event listener for submit button
// d3.select("#submit").on("click", handleSubmit);
// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    
    // var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // let desiredSamples = sample.filter(sampleObj => sampleObj.id == sample);
    // console.log(desiredSamples)
    //  5. Create a variable that holds the first sample in the array.
    // var firstSample = sample_values[0];
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    // var otu_ids = metadata.filter(desiredSamples => sample.id)
    // var otu_labels = metadata.filter(samplesArray => sample.names)
    // var sample_values = metadata.filter(samplesArray => sample.wfreq)
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // var trace = {
    //   otu_ids: [],
    //   otu_labels: [],
    //   sample_values: [],
    //   type: "bar"
    // };

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    console.log(sample_values)
    // var yticks = sample_values.list.map.reverse().slice(0,10)
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        // y: yticks,
        y: sample_values,
        // x: sample_values.slice(0, 10).reverse(),
        x: otu_ids,
        // text: otu_labels.slice(0, 10).reverse(),
        text: otu_labels,
        // text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values,
      }
    }]
    ;

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures for Sample",
      xaxis: {title: "OTU ID"},
      showlegend: false,
      hovermode: "closest",
      height: 500,
      width: 2000,
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // Create a variable that holds the samples array. 
      var samplesGauge = data.metadata;
      // Filter the data for the object with the desired sample number
      var samplesGauge = samplesGauge.filter(sampleObj => sampleObj.id == sample);
      var result = samplesGauge[0];
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {
          t: 30,
          l: 150
        }
      };
      Plotly.newPlot("bar", barData, barLayout);
      Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
      var samples = data.samples;
      console.log({samples})
      var metaData = data.metadata
      console.log({metaData})
      var resultMetadata = metaData.filter(sampleObj => sampleObj.id == sample);
      var resultMetadata = resultMetadata[0];
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
      console.log(sample_values)
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var bubbleData = [
        {
          y: sample_values,
          x: otu_ids,
          text: otu_labels,
          mode: 'markers',
          marker: {
            color: otu_ids,
            size: sample_values,
        }
      }]
      ;
      var bubbleLayout = {
        title: "Bacteria Cultures for Sample",
        xaxis: {title: "OTU ID"},
        showlegend: false,
        hovermode: "closest",
        height: 500,
        width: 2000,
      };
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
      console.log({result})
      var gaugeData = [
        {
          type: "indicator",
          mode: "gauge+number+delta",
          value: resultMetadata.wfreq,
          title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
          // delta: { reference: 2, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [0, 10], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "black" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 2], color: "red" },
              { range: [2, 4], color: "orange" },
              { range: [4, 6], color: "yellow" },
              { range: [6, 8], color: "lime"},
              { range: [8, 10], color: "green"},
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
        }
      }
      ];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { 
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }};
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData , gaugeLayout);
        // Use `.html("") to clear any existing metadata
        // PANEL.html("");
    
        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        // Object.entries(result).forEach(([key, value]) => {
        //   PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    
      };
    // Create a variable that filters the samples for the object with the desired sample number.
    // var samplesGauge = samples.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
    // var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    // var otu_ids = result.otu_ids;
    // var otu_labels = result.otu_labels;
    // var sample_values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    // parseFloat(data.metadata.wfreq)
    // Create the yticks for the bar chart.

    // // Use Plotly to plot the bar data and layout.
    // Plotly.newPlot("bar", barData, barLayout);
    
    // // Use Plotly to plot the bubble data and layout.
    // Plotly.newPlot('bubble', bubbleData, bubbleLayout);
   
    
    // // 4. Create the trace for the gauge chart.
    // var gaugeData = [
    //   {
    //     type: "indicator",
    //     mode: "gauge+number+delta",
    //     value: 10,
    //     title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
    //     delta: { reference: 2, increasing: { color: "RebeccaPurple" } },
    //     gauge: {
    //       axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
    //       bar: { color: "black" },
    //       bgcolor: "white",
    //       borderwidth: 2,
    //       bordercolor: "gray",
    //       steps: [
    //         { range: [0, 2], color: "red" },
    //         { range: [2, 4], color: "orange" },
    //         { range: [4, 6], color: "yellow" },
    //         { range: [6, 8], color: "lime"},
    //         { range: [8, 10], color: "green"},
    //       ],
    //       threshold: {
    //         line: { color: "red", width: 4 },
    //         thickness: 0.75,
    //         value: 490
    //       }
    //   }
    // }
    // ];
    
    // // 5. Create the layout for the gauge chart.
    // var gaugeLayout = { 
    //   width: 500,
    //   height: 400,
    //   margin: { t: 25, r: 25, l: 25, b: 25 },
    //   paper_bgcolor: "lavender",
    //   font: { color: "darkblue", family: "Arial" }};

    // // 6. Use Plotly to plot the gauge data and layout.
    // Plotly.newPlot("gauge", gaugeData , gaugeLayout);