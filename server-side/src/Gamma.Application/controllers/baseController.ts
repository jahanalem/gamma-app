import { injectable } from "inversify";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  request,
  queryParam,
  response,
  requestParam,BaseHttpController
} from "inversify-express-utils";

@injectable()
export class BaseController extends BaseHttpController {
  constructor() {
    super();
  }
}
