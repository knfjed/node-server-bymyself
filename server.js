const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("./index.ejs", "utf-8");
const style_css = fs.readFileSync("./style.css");

const server = http.createServer(getFromClient);

function getFromClient(request, response) {
  const url_parts = url.parse(request.url);
  switch (url_parts.pathname) {
    case "/":
      const text = ejs.render(index_page, {
        title: "Index",
        content: "これはテンプレートを使ったサンプルです",
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(text);
      response.end();
      break;

    case "/style.css":
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(style_css);
      response.end();
      break;

    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end();
      break;
  }
}

server.listen(3050);
console.log("server listening.....");
