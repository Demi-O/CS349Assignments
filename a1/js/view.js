'use strict';

var summaryView = function (model){
	model.addListener(function(arg1, arg2, arg3){
		var sign = "";
		if(arg1 == 'ACTIVITY_DATA_ADDED_EVENT'){
			sign = "+";
		}
		else{
			sign = "-";
		}
		var activity = arg3.activityType;
		switch(arg3.activityType){
			case 'Attending Lectures':
			var attendingTimeSpent = document.getElementById('attendingTimeSpent');
			attendingTimeSpent.innerHTML = parseInt(attendingTimeSpent.innerHTML) + parseInt(sign + arg3.activityDurationInMinutes);
			break;

			case 'Coding':
			var codingTimeSpent = document.getElementById('codingTimeSpent');
			codingTimeSpent.innerHTML = parseInt(codingTimeSpent.innerHTML) + parseInt(sign + arg3.activityDurationInMinutes);
			break;

			case 'Eating':
			var eatingTimeSpent = document.getElementById('eatingTimeSpent');
			eatingTimeSpent.innerHTML = parseInt(eatingTimeSpent.innerHTML) + parseInt(sign + arg3.activityDurationInMinutes);
			break;

			case 'Playing Soccer':
			var soccerTimeSpent = document.getElementById('soccerTimeSpent');
			soccerTimeSpent.innerHTML = parseInt(soccerTimeSpent.innerHTML) + parseInt(sign + arg3.activityDurationInMinutes);
			break;

			case 'Sleeping':
			var sleepingTimeSpent = document.getElementById('sleepingTimeSpent');
			sleepingTimeSpent.innerHTML = parseInt(sleepingTimeSpent.innerHTML) + parseInt(sign + arg3.activityDurationInMinutes);
			break;

			case 'Studying':
			var studyingTimeSpent = document.getElementById('studyingTimeSpent');
			studyingTimeSpent.innerHTML = parseInt(studyingTimeSpent.innerHTML) + parseInt(sign + arg3.activityDurationInMinutes);
			break;

			case 'Watching TV':
			var watchingTimeSpent = document.getElementById('watchingTimeSpent');
			watchingTimeSpent.innerHTML = parseInt(watchingTimeSpent.innerHTML) + parseInt(sign + arg3.activityDurationInMinutes);
			break;			
		}
	});
};

var dataView = function (model){
	model.addListener(function(arg1, arg2, arg3){
		var dataTable = document.getElementById('data_table');
		if(arg1 == 'ACTIVITY_DATA_ADDED_EVENT'){
			var row = dataTable.insertRow(1);
			
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			
			cell1.innerHTML = arg3.activityType;
			cell2.innerHTML = arg3.activityDataDict["energyLevel"];
			cell3.innerHTML = arg3.activityDataDict["stressLevel"];
			cell4.innerHTML = arg3.activityDataDict["happinessLevel"];
			cell5.innerHTML = arg3.activityDurationInMinutes;

			var btn = document.createElement('button');
			btn.type = "button"
			btn.innerText = "X";
			btn.className = "delete_button";
			cell6.appendChild(btn);

			btn.addEventListener('click', function(){
				row.remove();
				model.removeActivityDataPoint(arg3);
			});
		}
		else{

		}
	});
};

var divSelectView = function (graphModel){
	graphModel.addListener(function(arg1, arg2, arg3){
		if(arg1 == 'GRAPH_SELECTED_EVENT'){
			for(var i = 0; i < graphModel.graphNames.length; i++){
				document.getElementById(graphModel.graphNames[i]).style.display = 'none';
			}
			document.getElementById(arg3).style.display = 'block';
		}
		else{

		}
	});
};

var graphView = function(model){
	model.addListener(function(arg1, arg2, arg3){
		//get total number of entries and stats for each activity
		var entries = 0;

		var energyTotal = 0;
		var stressTotal = 0;
		var happinessTotal = 0;

		var averageEnergy= 0;
		var averageStress= 0;
		var averageHappiness= 0;

		var array = model.getActivityDataPoints();
		for(var i = 0; i < array.length; i++){
			entries++;
			energyTotal += parseInt(array[i].activityDataDict["energyLevel"]);
			stressTotal += parseInt(array[i].activityDataDict["stressLevel"]);
			happinessTotal += parseInt(array[i].activityDataDict["happinessLevel"]);
		}

		if(entries > 0){
			averageEnergy = Math.round(energyTotal/entries);
			averageStress = Math.round(stressTotal/entries);
			averageHappiness = Math.round(happinessTotal/entries);
		}

		var canvas = document.getElementById('graph_canvas');
    	var context = canvas.getContext('2d');

    	var width = canvas.width;
    	var height = canvas.height;
    	context.clearRect(0, 0, width, height);
    	var offset = 15;

    	context.fillStyle = 'black';
    	context.fillRect(0, 0, width, height);
    	context.strokeStyle = 'white';
    	//y-axis
    	context.moveTo(offset, offset - 7);
    	context.lineTo(offset, height - offset);
    	context.stroke();

    	//x-axis
    	context.moveTo(offset, height - offset);
    	context.lineTo(width - offset, height - offset);
    	context.stroke();

    	context.fillStyle = "white";
    	context.font="13px Arial";
    	context.fillText("0", offset - 15, height - offset);
    	context.fillText("1", offset - 15, (((height- offset - offset)/5)*4) + offset);
    	context.fillText("2", offset - 15, (((height- offset - offset)/5)*3) + offset);
    	context.fillText("3", offset - 15, (((height- offset - offset)/5)*2) + offset);
    	context.fillText("4", offset - 15, (((height- offset - offset)/5)*1) + offset);
    	context.fillText("5", offset - 15, offset);

    	context.fillText("Energy", (width/3) - 53, height - 3)
    	context.fillText("Stress", ((width/3)*2) - 73, height - 3)
    	context.fillText("Happiness", width - 100, height - 3)

    	if(entries > 0){
    		var eBarY = 0;
    		var eBarHeight = 0;
    		var barY = 0;
    		var barHeight = 0;

    		//Energy
    		var finalEnergy = parseInt(averageEnergy);
    		switch(finalEnergy){
    			case 1:
    			barY = (((height - offset - offset)/5)*4) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 2:
    			barY = (((height - offset - offset)/5)*3) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 3:
    			barY = (((height - offset - offset)/5)*2) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 4:
    			barY = (((height - offset - offset)/5)*1) + offset;
    			barHeight = height - offset - barY;
    			break;

				case 5:
    			barY = offset;
    			barHeight = height - offset - barY;
    			break;    			
    		}
    		context.beginPath();
    		context.strokeStyle = "white";
    		context.rect((width/3) - 85, barY, 100, barHeight);
    		context.fill();
    		//Stress
    		var finalStress = parseInt(averageStress);
    		switch(finalStress){
    			case 1:
    			barY = (((height - offset - offset)/5)*4) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 2:
    			barY = (((height - offset - offset)/5)*3) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 3:
    			barY = (((height - offset - offset)/5)*2) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 4:
    			barY = (((height - offset - offset)/5)*1) + offset;
    			barHeight = height - offset - barY;
    			break;

				case 5:
    			barY = offset;
    			barHeight = height - offset - barY;
    			break;    			
    		}
    		context.beginPath();
    		context.strokeStyle = "white";
    		context.rect(((width/3) * 2) - 102, barY, 100, barHeight);
    		context.fill();
    		//Happiness
    		var finalHappiness = parseInt(averageHappiness);
    		switch(finalHappiness){
    			case 1:
    			barY = (((height - offset - offset)/5)*4) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 2:
    			barY = (((height - offset - offset)/5)*3) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 3:
    			barY = (((height - offset - offset)/5)*2) + offset;
    			barHeight = height - offset - barY;
    			break;

    			case 4:
    			barY = (((height - offset - offset)/5)*1) + offset;
    			barHeight = height - offset - barY;
    			break;

				case 5:
    			barY = offset;
    			barHeight = height - offset - barY;
    			break;    			
    		}
    		context.beginPath();
    		context.strokeStyle = "white";
    		context.rect(width - 120, barY, 100, barHeight);
    		context.fill();
    	}
    	else{
    		context.clearRect(0, 0, width, height);
    		context.font="40px Arial";
    		context.fillText("No Data Entries", width/4, height/6);
    	}
	});
}

// Put your view code here (e.g., the graph renderering code)