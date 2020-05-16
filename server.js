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

// indexのアクセス処理
function response_index(request, response) {
  var msg = "これはインデックス ページです";
  var text = ejs.render(index_page, {
    title: "index",
    content: msg,
    data: data,
  });
  response.writeHead(200, { "Contents-Type": "text/html" });
  response.write(text);
  response.end();
}

// otherのアクセス処理
function response_other(request, response) {
  var msg = "これはotherのページです";

  // POSTアクセス時の処理
  if (request.method == "POST") {
    var body = "";

    // データ受信時のイベント処理
    // データを受け取ったら、都度追加し、変数bodyで保管
    request.on("data", (data) => {
      body += data;
    });

    // データ受信終了時のイベント処理
    // データを全て受け取ったら、最後にパースして値として取り出す
    // endイベントは全てのデータを受け取った後に発火するので、引数（渡されるデータ）はない
    request.on("end", () => {
      var post_data = qs.parse(body);
      msg += "あなたは" + post_data.msg + "と入力しました";
      var text = ejs.render(other_page, {
        title: "Other",
        content: msg,
      });

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(text);
      response.end();
    });

    // GETアクセス時の処理
  } else {
    var msg = "ページがありません";
    var text = ejs.render(other_page, {
      title: "Other",
      content: msg,
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(text);
    response.end();
  }
}
