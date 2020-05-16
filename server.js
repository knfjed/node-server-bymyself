const http = require("http");
const fs = require("fs");

var myServer = http.createServer((request, response) => {
  fs.readFile("./index.html", "UTF-8", (error, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
});

myServer.listen(3050);
console.log("server listening.....");
