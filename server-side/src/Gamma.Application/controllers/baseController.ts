import { injectable } from "inversify";
import { BaseHttpController } from "inversify-express-utils";

@injectable()
export class BaseController extends BaseHttpController {
  constructor() {
    super();
  }
}
