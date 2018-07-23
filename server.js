var http = require('http');
var fs = require('fs');

// var message = "It's my birthday!";

function handler(request, response) {
    // var method = request.method;
    // console.log(method);

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
    }
}

var server = http.createServer(handler);

server.listen(3000, function() {
    console.log("Server is listening op port 3000. Ready to accept requests!");
});

