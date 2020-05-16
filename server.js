const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const index_page = fs.readFileSync("./index.ejs", "utf-8");

const server = http.createServer(getFromClient);

function getFromClient(request, response) {
  const text = ejs.render(index_page, {
    title: "Index",
    content: "これはテンプレートを使ったサンプルです",
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(text);
  response.end();
}

server.listen(3050);
console.log("server listening.....");
