import { IError } from ".";

/**
 * エラーインターフェイス
 */
interface IUserErrors {
  userNotFound: IError;
}

/**
 * エラーメッセージ
 */
export const userErrors: IUserErrors = {
  userNotFound: {
    status: 404,
    code: "User not found"
  }
};
