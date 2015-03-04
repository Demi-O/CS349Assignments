'use strict';

/*
Put any interaction code here
 */
var model = new ActivityStoreModel();
var graphModel = new GraphModel();
var summary = new summaryView(model);
var data = new dataView(model);
var divSelect = new  divSelectView(graphModel);
var graph = new graphView(model);

window.addEventListener('load', function() {
    // You should wire up all of your event handling code here, as well as any
    // code that initiates calls to manipulate the DOM (as opposed to responding
    // to events)
    console.log("Hello world!");
    document.getElementById('analysis_div').style.display = 'none';
    document.getElementById('Data Entries').style.display = 'none';
    document.getElementById('Chart').style.display = 'none';

    
    // Canvas Demo Code. Can be removed, later
    /*var canvasButton = document.getElementById('run_canvas_demo_button');
    canvasButton.addEventListener('click', function() {
        runCanvasDemo();
    });*/

    var inputButton = document.getElementById('input_button');
    inputButton.addEventListener('click', function() {
        document.getElementById('input_div').style.display = 'block';
        document.getElementById('analysis_div').style.display = 'none';
    });

    var analysisButton = document.getElementById('analysis_button');
    analysisButton.addEventListener('click', function() {
        document.getElementById('input_div').style.display = 'none';
        document.getElementById('analysis_div').style.display = 'block';
    });

    var submit = document.getElementById('input_form');
    submit.addEventListener('submit', function(e){
        e.preventDefault();

        //activityType
        var activity = document.getElementById('activity_options');
        var activityValue = activity.options[activity.selectedIndex].text;
        //healthMetricsDict
        var dictionary = {};
        dictionary["energyLevel"] = document.getElementById('energy_options').value;
        dictionary["stressLevel"] = document.getElementById('stress_options').value;
        dictionary["happinessLevel"] = document.getElementById('happiness_options').value;
        //activityDuration
        var durationValue = document.getElementById('time_options').value; 
        //add data to array
        var data = new ActivityData(activityValue, dictionary, durationValue);
        console.log(data);
        model.addActivityDataPoint(data);
        console.log("Added new data point successfully");
        //change last submit date
        var date = new Date();
        document.getElementById('last_submit').innerHTML = "Last data entry: " + date;
        //reset and clear fields
        document.getElementById('activity_options').getElementsByTagName('option')[0].selected = 'selected';
        document.getElementById('energy_options').value = "";
        document.getElementById('stress_options').value = "";
        document.getElementById('happiness_options').value = "";
        document.getElementById('time_options').value = "";
    });

    var viewOptions = document.getElementById('dropdown');
    viewOptions.addEventListener('change', function() {
        console.log('Analysis view changed');
        var graph = viewOptions.options[viewOptions.selectedIndex].text;
        graphModel.selectGraph(graph);
    });
    
    //generateFakeData(model, 10);
});

/**
 * This function can live outside the window load event handler, because it is
 * only called in response to a button click event
 */
function runCanvasDemo() {
    /*
    Useful references:
     http://www.w3schools.com/html/html5_canvas.asp
     http://www.w3schools.com/tags/ref_canvas.asp
     */
    var canvas = document.getElementById('canvas_demo');
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    console.log("Painting on canvas at: " + new Date());
    console.log("Canvas size: " + width + "X" + height);

    context.fillStyle = 'grey';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'red';
    context.moveTo(0, 0);
    context.lineTo(width, height);
    context.stroke();
}
