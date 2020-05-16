// const http = require("http");

// // サーバーの立ち上げ
// const server = http.createServer();
// const myServer = server.on("request", function (req, res) {
//   res.writeHead(200, { "Contents-Type": "text/plain" });
//   res.write("hello world!!!!!!");
//   res.end();
// });

// myServer.listen(8000);
// console.log("server Listening.....");

const express = require("express");
const app = express();
// パス指定
const path = require("path");

// ポートで待ち受け
app.listen(8000, () => {
  console.log("server listening....");
});

// expressでルーティング
//1) publicフォルダまでのパス文字列を作成
//2) 1.の文字列をexpress.staticメソッドに渡して静的ファイルをルーティングするミドルウェアを作成
//3) 2.のミドルウェアをapp.useメソッドに渡して、8080へのアクセス時に利用されるようにする

app.use(express.static(path.join(__dirname, "public")));

// その他のリクエストに対するエラー

app.use((req, res) => {
  res.sendStatus(404);
  console.log("404 error desu");
});
