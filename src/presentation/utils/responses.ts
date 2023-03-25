import { APIGatewayProxyResult } from "aws-lambda";
export class ResponseHandler {
  private statusCode: number;
  private headers: { [key: string]: string | boolean };
  private body: string;

  constructor() {
    this.statusCode = 200;
    this.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };
    this.body = "";
  }

  setStatusCode(statusCode: number): ResponseHandler {
    this.statusCode = statusCode;
    return this;
  }

  setHeaders(headers: { [key: string]: string }): ResponseHandler {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  setBody(data: any): ResponseHandler {
    this.body = JSON.stringify(data);
    return this;
  }

  success(data: any): APIGatewayProxyResult {
    this.setStatusCode(200).setBody(data);
    return this.build();
  }

  created(data: any): APIGatewayProxyResult {
    this.setStatusCode(201).setBody(data);
    return this.build();
  }

  clientError(errorMessage: string): APIGatewayProxyResult {
    this.setStatusCode(400).setBody({ error: errorMessage });
    return this.build();
  }

  notFound(errorMessage: string): APIGatewayProxyResult {
    this.setStatusCode(404).setBody({ error: errorMessage });
    return this.build();
  }

  serverError(errorMessage: string): APIGatewayProxyResult {
    this.setStatusCode(500).setBody({ error: errorMessage });
    return this.build();
  }

  private build(): APIGatewayProxyResult {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: this.body,
    };
  }
}
