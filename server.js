var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var message = "It's my birthday!";

function handler(request, response) {
    var method = request.method;
    console.log(method);

    var endpoint = request.url;
    console.log(endpoint);

    if (endpoint === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile(__dirname + '/public/index.html', function(error, file) {
            if (error) {
                console.log(error);
                return;
            } 

            response.end(file);
        });
    } else if (endpoint === "/node") {
        message = "this is node";
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(message);
        response.end();
    } else if (endpoint === "/girls") {
        message = "this is girls";
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(message);
        response.end();
    } else {
        var extension = endpoint.split('.')[1];
        var extensionType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
            ico: 'image/x-icon',
            jpg: 'image/jpg',
            png: 'image/png'
        }
        response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
        fs.readFile(__dirname + '/public/' + endpoint, function(error, file) {
            if (error) {
                console.log(error);
                return;
            } else {
                var allTheData = '';
                request.on('data', function(chunkOfData){
                allTheData += chunkOfData;
                });

                request.on('end', function(){
                var convertedData = querystring.parse(allThe )
                    console.log(convertedData);
                response.end();
                });
            }
            response.end(file);
        });
    }
};


var server = http.createServer(handler);

server.listen(3000, function() {
    console.log("Server is listening op port 3000. Ready to accept requests!");
});
