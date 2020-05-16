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
  msg: "no message....",
};

// indexのアクセス処理
function response_index(request, response) {
  // POSTアクセス時の処理
  if (request.method == "POST") {
    var body = "";

    // データ受信時の処理
    request.on("data", (data) => {
      body += data;
    });

    // データ受信終了時の処理
    request.on("end", () => {
      data = qs.parse(body);

      // クッキーの保存
      setCookie("msg", data.msg, response);
      write_index(request, response);
    });
  } else {
    write_index(request, response);
  }
}

// indexページの作成
function write_index(request, response) {
  var msg = "＊伝言を表示します";
  var cookie_data = getCookie("msg", request);
  var text = ejs.render(index_page, {
    title: "index",
    content: msg,
    data: data,
    cookie_data: cookie_data,
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(text);
  response.end();
}

// クッキーの値の設定
function setCookie(key, value, response) {
  var cookie = escape(value);
  response.setHeader("Set-Cookie", [key + "=" + cookie]);
}

// クッキーの値を取得
function getCookie(key, request) {
  var cookie_data =
    request.headers.cookie != undefined ? request.headers.cookie : "";
  var data = cookie_data.split(";");
  for (var i in data) {
    if (data[i].trim().startsWith(key + "=")) {
      var result = data[i].trim().substring(key.length + 1);
      return unescape(result);
    }
  }
  return "";
}

// // otherのアクセス処理
// function response_other(request, response) {
//   var msg = "これはotherのページです";
//   var text = ejs.render(other_page, {
//     title: "Other",
//     content: msg,
//     data: data,
//     filename: "data_item",
//   });
//   response.writeHead(200, { "Content-Type": "text/html" });
//   response.write(text);
//   response.end();
// }
