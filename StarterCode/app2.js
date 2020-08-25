function info(id){
    d3.json("samples.json").then (sampledata =>{
        var data = sampledata.metadata
        console.log(data)
   

        var filtered = data.filter(meta => meta.id.toString() === id)[0];

        var dem_info = d3.select("#sample-metadata");
        dem_info.html("");
        Object.entries(filtered).forEach((key) => {   
            dem_info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function plots(id){
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata.samples[0]);
        filtered_data=sampledata.samples.filter(data=>data.id.toString() === id);
        console.log(filtered_data);
        var otu_ids=filtered_data.otu_ids;
        console.log(otu_ids);
        var values = filtered_data.sample_values.slice(0,10).reverse();
        console.log(values);
        var labels = filtered_data.otu_labels.slice(0,10);
        console.log(labels);
    
        var top_otu = (filtered_data.otu_ids.slice(0, 10)).reverse();
        var otu_id = top_otu.map(d => "OTU " + d);
        console.log(`OTU IDS: ${otu_id}`)
        var labels =  filtered_data.otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: values,
            y: otu_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        var data = [trace];
        var layout = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
    
        };
    Plotly.newPlot("bar", data, layout);
        var trace1 = {
            x: filtered_data.otu_ids,
            y: filtered_data.sample_values,
            mode: "markers",
            marker: {
                size: filtered_data.sample_values,
                color: filtered_data.samples[0].otu_ids
            },
            text:  filtered_data.otu_labels
    
        };
    
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
    
        var data1 = [trace1];
    
    
    Plotly.newPlot("bubble", data1, layout_2);
         
    });
}


function optionChanged(id) {
    plots(id);
    info(id);
}

function init() {
     
    var dropdown = d3.select("#selDataset");


    d3.json("samples.json").then((data)=> {
        console.log(data)

        
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        
        plots(data.names[0]);
        info(data.names[0]);
    });
}

init();