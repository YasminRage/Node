const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;

const getJSONString = obj => JSON.stringify(obj, null, 2);

const app = http.createServer();

app.on("request", (req, res) => {
  let body = [];

  req.on("data", chunk => {
    body.push(chunk);
  });

  req.on("end", () => {
    body = Buffer.concat(body).toString();

    console.log(`Request Body Contents: ${body}`);
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);

    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });

    const routeResponseMap = {
      "/info": "<h1>Info Page</h1>",
      "/contact": "<h1>Contact Us</h1>",
      "/about": "<h1>Learn More About Us.</h1>",
      "/hello": "<h1>Say hello by emailing us here</h1>",
      "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
    };

    const responseMessage = routeResponseMap[req.url] || "<h1>Welcome!</h1>";
    res.end(responseMessage);

    console.log(`Sent a response: ${responseMessage}`);
  });
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
setTimeout(() => res.end(routeResponseMap[req.url]), 2000);