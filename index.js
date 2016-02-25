var http = require('http');
var url = require('url');
var jsonData = require('./data/offlinify-data.json');

var server = http.createServer(function(req, res) {
  var pathURL = url.parse(req.url).pathname;
  res.writeHead(200, {"Content-Type": "text/html"});

  if(pathURL == '/') {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<!doctype html><html><body><p>This is the Offlinify API. Use /get and /post.</p></body></html>");
  }
  else if(pathURL == '/get') {
    res.writeHead(200, {"Content-Type": "application/JSON"});
    res.write(JSON.stringify(jsonData));
  }
  else if(pathURL == '/post') {
    res.writeHead(200, {"Content-Type": "application/JSON"});
    // Something.
  }
  else {
    res.writeHead(404);
  }

  res.end();
});

server.listen(7000);
