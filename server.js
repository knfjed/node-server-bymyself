const http = require("http");
const fs = require("fs");

var myServer = http.createServer((request, response) => {
  fs.readFile("./index.html", "UTF-8", (error, data) => {
    var content = data
      .replace(/dummy-title/g, "タイトルです")
      .replace(/dummy-contents/, "コンテンツです");

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(content);
    response.end();
  });
});

myServer.listen(3050);
console.log("server listening.....");
