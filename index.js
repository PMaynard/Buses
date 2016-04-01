#!/usr/bin/env node
var util = require("util");
var request = require("request");
var express = require("express")
var app = express();


app.get('/', function (req, res) {	
	var html = "", stops = "";

	request("http://www.translink.co.uk/Templates/Translink/Util/Services/MdvWidgetStopFinderHandler.ashx?language=en&name_sf="+req.query.stop+"&outputFormat=JSON&odvSugMacroNIR=true&stateless=1&useHouseNumberList=1&itdLPxx_usage=origin", function(error, response, body) {
		stops = JSON.parse(body);

	// console.log(stops.stopFinder)

	for(var i in stops.stopFinder.points){
		console.log(stops.stopFinder.points[i].name)
		html += "<li><a href='/next/" + stops.stopFinder.points[i].ref.omc +"''>" + stops.stopFinder.points[i].name +"</a></li>"
	}
	res.send(html);
	});
});

app.get('/next/:id', function (req, res) {	
    var d = new Date();
	var html = ""

	request("http://www.translink.co.uk/Templates/Translink/Util/Services/MdvJourneyPlannerWidgetDepartureHandler.ashx?language=en&itdLPxx_depOnly=1&limit=8&dmMacroNIR=true&maxAssignedStops=1&includedMeans=checkbox&name_dm="+req.param.id+"&commonMacroNIR=true&inclMOT_0=1&motBusMacroNIR=true&itdTimeHour="+d.getHours()+"&itdTimeMinute="+d.getMinutes()+"&itdDate=20160401", function(error, response, body) {
	// request("http://www.translink.co.uk/Templates/Translink/Util/Services/MdvJourneyPlannerWidgetDepartureHandler.ashx?language=en&itdLPxx_depOnly=1&limit=8&dmMacroNIR=true&maxAssignedStops=1&includedMeans=checkbox&name_dm=10011918        &commonMacroNIR=true&inclMOT_0=1&motBusMacroNIR=true&itdTimeHour=15&itdTimeMinute=09&itdDate=20160401", function(error, response, body) {

		console.log(response)
		times = JSON.parse(body);

		for(var i in times.departureList){
			d = times.departureList[i];
			// console.log(d)
			html += "<li>"+ d.servingLine.number +" - "+ d.stopName+ " in " + d.countdown +"min, at "+ d.dateTime.hour +":"+d.dateTime.minute+"</li>"
		}

		res.send(html);
	});
});

app.listen(8007, function() {
	util.log("listeing on 8007");
});