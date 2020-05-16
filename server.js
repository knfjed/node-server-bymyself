const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");

const index_page = fs.readFileSync("./index.ejs", "utf-8");
const other_page = fs.readFileSync("./other.ejs", "utf-8");
const style_css = fs.readFileSync("./style.css", "utf-8");

const server = http.createServer(getFromClient);

server.listen(3050);
console.log("server listening.....");

// createServerの処理
function getFromClient(request, response) {
  const url_parts = url.parse(request.url, true);

  switch (url_parts.pathname) {
    case "/":
      response_index(request, response);
      break;

    case "/style.css":
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(style_css);
      response.end();
      break;

    case "/other":
      response_other(request, response);
      break;

    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("no page....sorry");
      break;
  }
}

// 追加するデータ用変数
var data = {
  Taro: "09-2345-4226",
  Hanako: "080-2264-7894",
  Sachiko: "090-4575-1245",
  Ichiro: "070-4579-8694",
};

var data2 = {
  Taro: ["taro@yamada.com", "090-2456-2463", "tokyo"],
  Hanako: ["hanako@satou.com", "012-2465-7594", "sendai"],
  Sachiko: ["sachiko@suzuki.com", "080-4562-4587", "osaka"],
  Ichiro: ["ichiro@abe.com", "070-4579-3564", "okinawa"],
};

// indexのアクセス処理
function response_index(request, response) {
  var msg = "これはインデックス ページです";
  var text = ejs.render(index_page, {
    title: "index",
    content: msg,
    data: data,
    filename: "data_item",
  });
  response.writeHead(200, { "Contents-Type": "text/html" });
  response.write(text);
  response.end();
}

// otherのアクセス処理
function response_other(request, response) {
  var msg = "これはotherのページです";
  var text = ejs.render(other_page, {
    title: "Other",
    content: msg,
    data: data2,
    filename: "data_item",
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(text);
  response.end();
}
