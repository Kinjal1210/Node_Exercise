const http = require("http");

const port = 3000;

// Creates a server object
http
  .createServer((request, response) => {
    const url = request.url;
    console.log("The url is:", url);
    const method = request.method;
    response.setHeader("Content-Type", "text/html");
    console.log("Request made with this method: ", request.method);
    const dataChunksArray = [];

    request.on("data", (chunk) => {
        console.log("Chunk", chunk);
        dataChunksArray.push(chunk);
    });

    request.on("end", () => {
        
        if (method == "POST" && dataChunksArray.length > 0){
            console.log(dataChunksArray);
            const body = JSON.parse(Buffer.concat(dataChunksArray).toString());
            const responseBody = { method, url, body};

            if (url == "/"){
                response.writeHead(200, "OK");
                response.write("<h1>Message Received</h1>");
            } else if (url == "/echo"){
                response.writeHead(200, "OK");
                response.write(JSON.stringify(responseBody));
            }
        }
        
        response.end();
    });

    if (url == "/"){
        if (method == "GET"){
            response.write("<h1>Home: Kunjal's Mac</h1>");
            response.statusCode = 200;
            response.end();
        }
    } else if (url == "/about"){
        response.statusCode = 200;
        response.write("About - I am Kunjal");
        response.end();
    } else if (url == "/contact"){
        response.statusCode = 200;
        response.write("<h1>Contact Me: Kunjal@tevs.com</h1>");
        response.end();
    }
    
  })
  .listen(port, () => {
    console.log("Server listening on port: " + port);
  });