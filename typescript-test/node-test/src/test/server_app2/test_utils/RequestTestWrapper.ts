import { HTTP_METHODS } from "../../../app/server_app/model/ServerModel";

export class RequestTestWrapper {
  public url: string;
  public method: HTTP_METHODS;
  public headers = {};
  public body: object;

  public on(event, cb) {
    if (event === "data") {
      cb(JSON.stringify(this.body));
    } else {
      cb();
    }
  }

  public clearFields() {
    this.url = undefined;
    this.body = undefined;
    this.method = undefined;
    this.headers = {};
  }
}
