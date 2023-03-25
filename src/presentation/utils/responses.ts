export class SuccessResponseCS<T> {
  body: string;
  message: string;
  statusCode: number;
  headers: any;

  constructor(body: T, message: string, statusCode: number = 200) {
    this.body = JSON.stringify({
      ...body,
      message,
    });
    this.message = message;
    this.statusCode = statusCode;
    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };
  }
}
