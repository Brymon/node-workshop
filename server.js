var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var message = "It's my birthday!";

function handler(request, response) {
    var method = request.method;
    console.log(method);

    var endpoint = request.url;
    console.log(endpoint);

    var extension = endpoint.split('.')[1];
        var extensionType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
            ico: 'image/x-icon',
            jpg: 'image/jpg',
            png: 'image/png'
        }

    if (endpoint === "/") {
        fs.readFile(__dirname + '/public/index.html', function(error, file) {
            if (error) {
                console.log(error);
                return;
            } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(file);
            }
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
    } else if (endpoint === "/create-post") {
        var allTheData = '';
        
        request.on('data', function(chunkOfData){
            allTheData += chunkOfData;
        });

        request.on('end', function(){
            var convertedData = querystring.parse(allTheData);
            console.log(convertedData);
            response.writeHead(300, {"Locaton":"/index.html"});
            console.log("my url is : " + endpoint);
            response.end();
        });
        //end of step 6 goes here!
    } else {
        fs.readFile(__dirname + '/public/' + endpoint, function(error, file) {
            if (error) {
                console.log(error);
                return;
            } else {
                response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
                response.end(file);
            }
        });
    }
}
var server = http.createServer(handler);

server.listen(3000, function() {
    console.log("Server is listening op port 3000. Ready to accept requests!");
});
