var http = require('http');

var message = "It's my birthday!";

function handler(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
}

var server = http.createServer(handler);

server.listen(3000, function() {
    console.log("Server is listening op port 3000. Ready to accept requests!");
});

