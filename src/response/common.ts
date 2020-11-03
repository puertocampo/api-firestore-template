import { Response } from "express";
import { errors, IError } from "../errors";

// ================================
// エラー内容のレスポンス
// ================================

/**
 * 指定されたエラーをレスポンスする
 * @param res - レスポンス
 * @param err  - エラーオブジェクト
 */
export const responseError = (res: Response, err: IError): void => {
  res.status(err.status).send({
    code: err.code,
    status: err.status,
    message: err.message || "",
    stack: err.stack,
    data: err.data
  });
};

/**
 * status code500、Internal server errorをレスポンスする
 * @param res - レスポンス
 * @param err  - エラーオブジェクト
 */
export const responseInternalServerError = (res: Response, err: Error): void => {
  res.status(errors.internalServerError.status).json({
    code: errors.internalServerError.code,
    status: errors.internalServerError.status

    // 予期せぬエラーのため、stackも付与する
    // stack: err.stack
  });

  // sentryにエラーを送信する
  // raven.sendError(err);
};
