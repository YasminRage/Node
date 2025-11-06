// Set the port number the server will listen on
const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes");

  // Create the server and handle incoming requests
  app = http.createServer((request, response) => {
    console.log("Received an incoming request!");
    response.writeHead(httpStatus.OK, { "Content-Type": "text/html" }); // Send HTTP 200 with HTML header
    let responseMessage = "<h1>Hello, Universe, this is Yasmin speaking!</h1>";
    response.write(responseMessage);
    response.end();
    console.log(`Sent a response : ${responseMessage}`);
  });

// Start listening on port 3000
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
