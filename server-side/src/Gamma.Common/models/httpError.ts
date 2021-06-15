export class HttpError extends Error {
  code: number;
  errorMessage: string;
  constructor(message: string, errorCode: number) {
    super(message);
    this.code = errorCode;
    this.errorMessage = message;
  }
}
