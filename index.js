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

var server = http.createServer(function(req, res) {
  var pathURL = url.parse(req.url).pathname;
  res.writeHead(200, {"Content-Type": "text/html"});

  if(pathURL == '/') {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<!doctype html><html><body><p>This is the Offlinify API. Use /get and /post.</p></body></html>");
  }
  else if(pathURL == '/get' || pathURL == '/getBig') {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "application/JSON"});
    var filteredData;
    if(pathURL == '/get') filteredData = jsonData;
    else filteredData = jsonDataBig;
    if(params.after) {
      filteredData = _.filter(filteredData, function(o) {
        return Date.parse(o.timestamp) > Date.parse(params.after);
      });
    }
    res.write(JSON.stringify(filteredData));
  }
  else if(pathURL == '/getBGMS') {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "application/JSON"});
    var filteredData = jsonDataBGMS;
    if(params.after) {
      filteredData = _.filter(filteredData, function(o) {
        return Date.parse(o.timestamp) > Date.parse(params.after);
      });
    }
    //res.write(JSON.stringify(filteredData));
    res.write(JSON.stringify(jsonDataBGMS)); // for now just return everything
  }
  else if(pathURL == '/post') {
    res.writeHead(200, {"Content-Type": "application/JSON"});
    console.log("Post request received...");
    // Something.
  }
  else {
    res.writeHead(404);
  }

  res.end();
});

server.listen(80);
