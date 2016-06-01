var screen_resolution = window.screen.availWidth;
var allData = getData();
var lineColor = '#000000'
var font = 'Helvetica'

function drawLineChart(div, tab){
	var chartTitle = allData['meta']['chart_title'][tab];
	var yAxis = allData['meta']['y_axis'][tab];
	var background = allData['meta']['bg_color'][tab];
	var rounding = allData['meta']['rounding'][tab];
	var legend = false;

	// Get Suffixes and Prefixes
	var prefix = allData['meta']['prefix'][tab];
	var suffix = allData['meta']['suffix'][tab];
	if (prefix == '_'){
		prefix = '';
	}
	if (suffix == '_'){
		suffix = '';
	}

	// Get values for charts
	var data = [];
	var lineColors = [];
	var i = 1;

	for (keyOne in allData[tab]){
		var entry = {};
		var values = [];
		var colName = 'line_color_';
		var seriesName = keyOne;
		var indices = allData[tab][keyOne];
		var xAxis = [];
		colName = colName.concat(i);

		// Ensure keys are sorted correctly
	    var keys = [];
	    var k, j, len;

	  	for (k in indices) {
	    	if (indices.hasOwnProperty(k)) {
				keys.push(k);
	    	}
		}

		keys.sort();
		len = keys.length;

		// Cycle through keys in order
		for (j = 0; j < len; j++) {
		  	k = keys[j];
			value = Number(Number(indices[k]).toFixed(rounding));
			values.push(value);
			xAxis.push(k);
		}

		// Get meta data
		entry['name'] = seriesName;
		entry['data'] = values;
		entry['color'] = allData['meta'][colName][tab];
		data.push(entry);

		// Check if Legend is needed (i.e. there is more than 1 series)
		if (i > 1){
			legend = true;
		}
		i = i + 1;
	}

	$('#' + div).highcharts({
		title: {
			text: chartTitle, // Chart text from meta data
			x: 0 //center
		},
        chart: {
			backgroundColor: background, // Background color
            style: {
                fontFamily: font
            }
        },
		xAxis: {
			lineColor: lineColor,
			tickColor: lineColor,
			categories: xAxis, // list of index values
			labels: {
				style: {
					color: lineColor
				}
			}
		},
		yAxis: {
			title: {
				text: yAxis,
				style: {
					color: lineColor
				}
			},
			labels: {
				style: {
					color: lineColor
				}
			},
			gridLineColor: lineColor,
			gridLineDashStyle: 'ShortDot',
			plotLines: [{
				value: 0,
				width: 1,
			}]
		},
		tooltip: {
			valuePrefix: prefix,
			valueSuffix: suffix
		},
		legend: {
			enabled: legend
		},
		series: data
	});
}

function drawBarChart(div, tab, stacked){
	var chartTitle = allData['meta']['chart_title'][tab];
	var yAxis = allData['meta']['y_axis'][tab];
	var background = allData['meta']['bg_color'][tab];
	var rounding = allData['meta']['rounding'][tab];
	var legend = false;

	// Get Suffixes and Prefixes
	var prefix = allData['meta']['prefix'][tab];
	var suffix = allData['meta']['suffix'][tab];
	if (prefix == '_'){
		prefix = '';
	}
	if (suffix == '_'){
		suffix = '';
	}

	// Determine if columns are stacked
	var chartType = null;
	if (stacked) {
		chartType = 'normal';
	}

	// Get values for charts
	var data = [];
	var lineColors = [];
	var i = 1;

	for (keyOne in allData[tab]){
		var entry = {};
		var values = [];
		var colName = 'line_color_';
		var seriesName = keyOne;
		var indices = allData[tab][keyOne];
		var xAxis = [];
		colName = colName.concat(i);

		// Ensure keys are sorted correctly
	    var keys = [];
	    var k, j, len;

	  	for (k in indices) {
	    	if (indices.hasOwnProperty(k)) {
				keys.push(k);
	    	}
		}

		keys.sort();
		len = keys.length;

		// Cycle through keys in order
		for (j = 0; j < len; j++) {
		  	k = keys[j];
			value = Number(Number(indices[k]).toFixed(rounding));
			values.push(value);
			xAxis.push(k);
		}

		entry['name'] = seriesName;
		entry['data'] = values;
		entry['color'] = allData['meta'][colName][tab];
		data.push(entry);

		// Check if Legend is needed (i.e. there is more than 1 series)
		if (i > 1){
			legend = true;
		}
		i = i + 1;
	}

	$('#' + div).highcharts({
		title: {
			text: chartTitle, // Chart text from meta data
			x: 0 //center
		},
        chart: {
			type: 'column',
			backgroundColor: background, // Background color
            style: {
                fontFamily: font
            }
		},
		plotOptions: {
		            series: {
		                stacking: chartType
		            }
		},
		xAxis: {
			lineColor: lineColor,
			tickColor: lineColor,
			categories: xAxis, // list of index values
			labels: {
				style: {
					color: lineColor
				}
			}
		},
		yAxis: {
			title: {
				text: yAxis,
				style: {
					color: lineColor
				}
			},
			labels: {
				style: {
					color: lineColor
				}
			},
			gridLineColor: lineColor,
			gridLineDashStyle: 'ShortDot',
			plotLines: [{
				value: 0,
				width: 1,
			}]
		},
		tooltip: {
			valuePrefix: prefix,
			valueSuffix: suffix
		},
		legend: {
			enabled: legend
		},
		series: data
	});
}

$(document).ready(function(){
    $("#line-chart-div").empty();
    if (screen_resolution <= 480){
        $("#line-chart-div").append("<div id='line-chart1' style='margin: auto; width: 320px; height: 350px;'></div>");
    } else if (screen_resolution > 480 && screen_resolution < 1200) {
        $("#line-chart-div").append("<div id='line-chart1' style='margin: auto; min-width: 310px; max-width: 550px; width: 100%; height: 300px;'></div>");
    } else {
    $("#chart-div-1").append("<div id='chart1' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-2").append("<div id='chart2' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-3").append("<div id='chart3' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-4").append("<div id='chart4' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-5").append("<div id='chart5' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-6").append("<div id='chart6' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-6-1").append("<div id='chart6-1' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-6-2").append("<div id='chart6-2' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-7").append("<div id='chart7' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-8").append("<div id='chart8' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-9").append("<div id='chart9' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-10").append("<div id='chart10' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-11").append("<div id='chart11' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-12").append("<div id='chart12' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-13").append("<div id='chart13' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-14").append("<div id='chart14' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-15").append("<div id='chart15' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-16").append("<div id='chart16' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-17").append("<div id='chart17' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-18").append("<div id='chart18' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-19").append("<div id='chart19' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-20").append("<div id='chart20' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-21").append("<div id='chart21' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
		$("#chart-div-12").append("<div id='chart22' style='margin: auto; min-width: 310px; max-width: 800px; width: 100%; height: 400px;'></div>");
    }

	// Draw Charts
	drawBarChart('chart1', '1', true);
	drawBarChart('chart2', '2', false);
	drawBarChart('chart3', '3', false);
	drawBarChart('chart4', '4', true);
	drawBarChart('chart5', '5', true);
	drawBarChart('chart6', '6', false);
	drawBarChart('chart6-1', '6_1', true);
	drawBarChart('chart6-2', '6_2', false);
	drawBarChart('chart7', '7', false);
	drawBarChart('chart8', '8', true);
	drawBarChart('chart9', '9', true);
	drawBarChart('chart10', '10', false);
	drawBarChart('chart11', '11', false);
	drawBarChart('chart12', '12', false);
	drawBarChart('chart13', '13', false);
	drawBarChart('chart14', '14', false);
	drawBarChart('chart15', '15', false);
	drawBarChart('chart16', '16', false);
	drawBarChart('chart17', '17', false);
	drawBarChart('chart18', '18', false);
	drawBarChart('chart19', '19', false);
	drawBarChart('chart20', '20', false);
	drawBarChart('chart21', '21', false);
	drawBarChart('chart22', '22', false);
})
