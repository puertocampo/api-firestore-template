/**
 * エラーインターフェイス
 */
export interface IError {
  code?: string;
  message?: string;
  status: number;
  stack?: string;
  data?: any;
}

interface IErrors {
  internalServerError: IError;
}

/**
 * エラーメッセージ
 */
export const errors: IErrors = {
  internalServerError: {
    status: 500,
    code: "Internal server error"
  }
};
