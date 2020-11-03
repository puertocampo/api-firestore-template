/**
 * アプリを初期化/起動する
 */

import * as bodyParser from "body-parser";
import express from "express";
import router from "./router";
import * as commonResponse from "../response/common";

const app: express.Express = express();

app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import connectTimeout from "connect-timeout";
app.use(connectTimeout("100000s"));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.raw({ type: "*/*" }));

// 開発用にCORSを許可する
app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Accept, Accept-Encoding, Content-Type, Authorization, If-Modified-Since"
  );
  res.header("Access-Control-Request-Method", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  next();
});

// 長時間の実行に耐えられるように、10mでtimeoutするようにする。
app.use((req: express.Request, _res: express.Response, next: express.NextFunction) => {
  req.connection.setTimeout(60 * 10 * 1000);
  next();
});

// Route設定
app.use("/api", router);

// エラーが起きた場合のハンドリングを行う
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err.status) {
    commonResponse.responseError(res, err);
    return;
  }
  if (err.code && err.stack) {
    err.status = 500;
    commonResponse.responseError(res, err);
    return;
  }
  commonResponse.responseInternalServerError(res, err);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

export default app;
