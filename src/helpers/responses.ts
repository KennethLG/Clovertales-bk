export class SuccessResponseCS<T> {
  body: string;
  message: string;
  statusCode: number;

  constructor(body: T, message: string, statusCode: number = 200) {
    this.body = JSON.stringify({
      ...body,
    });
    this.message = message;
    this.statusCode = statusCode;
  }
}
