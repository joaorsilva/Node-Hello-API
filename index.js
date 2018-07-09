
const http = require('http');
const url = require('url');
const path = require('path');

const httpPort = 3000;

const server = {};

server.httpServer = http.createServer(function(req,res) {
    server.urlPath(req,res);
});

server.urlPath = function (req,res) {

    // Parse request URL
    const parsedUrl = url.parse(req.url, true);

    //Normalize path
    const path = parsedUrl.pathname;
    const finalPath = path.replace(/^\/+|\/+$/g,'').toLowerCase();

    //Return body
    let body = {};
    // Http status code
    let statusCode = 200;

    res.setHeader('Content-Type','application/json');
    // We just have one API end point (called hello)
    if(finalPath === 'hello') {
        body = {"message": "Welcome to Hello server"};
    } else {
        statusCode = 404;

    }

    res.writeHead(statusCode);
    res.end(JSON.stringify(body));

}

server.httpServer.listen(httpPort, function() {
    console.log(`Server listenning on port ${httpPort}`);
});
