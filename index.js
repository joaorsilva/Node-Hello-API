
/**
 * Node imports
 * 
 */
const http = require('http');
const url = require('url');
const path = require('path');

/**
 * Server constants
 */
const httpPort = 3000;

/**
 * Object wrapper
 */
const server = {};

/**
 * Creates the httpServer object
 */
server.httpServer = http.createServer(function(req,res) {
    server.urlPath(req,res);
});

/**
 * Handdler for all paths
 * @param { User request object } req 
 * @param { Server response object } res 
 */
server.urlPath = function (req,res) {

    // Parse request URL
    const parsedUrl = url.parse(req.url, true);

    //Normalize path
    const path = parsedUrl.pathname;
    let finalPath = path.replace(/^\/+|\/+$/g,'');
    
    //Check the path
    finalPath = typeof(finalPath) === "string" ? finalPath.toLowerCase() : '';

    //Return body
    let body = {};
    // Http status code
    let statusCode = 200;

    //Content type is always JSON even if empty
    res.setHeader('Content-Type','application/json');

    // We just have one API end point (called hello)
    if(finalPath === 'hello') {
        body = {"message": "Welcome to Hello server"};
    } else {
        statusCode = 404;
    }

    //Write the status code
    res.writeHead(statusCode);

    //Send the response to client
    res.end(JSON.stringify(body));
}

/**
 * Server listen
 */
server.httpServer.listen(httpPort, function() {
    console.log(`Server listenning on port ${httpPort}`);
});
