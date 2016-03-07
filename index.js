var http = require('http');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var app = express();
var cors = require('cors');

var _ = require('lodash');

var jsonData = require('./data/offlinify-data.json');
var jsonDataBig = require('./data/offlinify-data-big.json');
var jsonDataBGMS = require('./data/test-bgms.json');

app.use(cors());


app.get('/', function(req, res) {
	res.render("<!doctype html><html><body><p>This is the Offlinify API. Use /get and /post.</p></body></html>");
});

app.get('/get', function(req, res) {
	var filteredData = jsonData;
	
	if(req.query.after) {
      filteredData = _.filter(filteredData, function(o) {
        return Date.parse(o.timestamp) > Date.parse(req.query.after);
      });
    }
	
	res.json(filteredData);
});

app.get('/getBig', function(req, res) {
	var filteredData = jsonDataBig;
	
	if(req.query.after) {
      filteredData = _.filter(filteredData, function(o) {
        return Date.parse(o.timestamp) > Date.parse(req.query.after);
      });
    }
	
	res.json(filteredData);
});

app.get('/getBGMS', function(req, res) {
	var filteredData = _.cloneDeep(jsonDataBGMS);
	
	if(req.query.after) {
		
		var actualFeatures = filteredData.features;
		
      filteredFeatures = _.filter(actualFeatures, function(o) {
        return Date.parse(o.properties.time_updated) > Date.parse(req.query.after);
      });
	  
	  filteredData.features = filteredFeatures;
    }
	
	res.json(filteredData);
});

app.post('/post', function(req, res) {
	console.log("Post request received.");
});

app.listen(80, function() {
	console.log("Offlinify API listening on Port 80 (HTTP)");
});

