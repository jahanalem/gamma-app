import { BaseController } from "./baseController";
import { NextFunction, Request, Response } from "express";
const { body, validationResult } = require("express-validator");
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  next,
  request,
  response,
} from "inversify-express-utils";
import { inject} from "inversify";
import TYPES from "../../Gamma.Constants/types";
import { IUserService } from "../../Gamma.Services/interfaces/IUserService";
import { SignUpUserViewModel } from "../../Gamma.Models/ViewModels/signUpUserViewModel";
import { LoginUserViewModel } from "../../Gamma.Models/ViewModels/loginUserViewModel";
import { HttpError } from "../../Gamma.Common/models/httpError";
import { HTTPStatusCodes } from "../../Gamma.Common/constants/HTTPStatusCodes";
import { error } from "console";

const checkAuth = require('../middleware/checkAuthMiddleware');

@controller("/users")
export class UserController extends BaseController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {
    super();
  }

  @httpPost("/signup")
  private async signup(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError("Invalid inputs passed, please check your data.", HTTPStatusCodes.ClientError.UnprocessableEntity));
    }
    const { firstName, lastName, userName, email, password, confirmPassword } = req.body;

    const candidateUser = new SignUpUserViewModel(
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword
    );

    await this.userService.Signup(candidateUser).then(result => {
      res.status(HTTPStatusCodes.Successful.Created).json(result);
    }).catch(error => {
      next(error);
    });
  }

  @httpGet("/login")
  private async login(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const { email, password } = req.body;
    const user = new LoginUserViewModel(email, password);

    await this.userService.Login(user).then(result => {
      res.status(HTTPStatusCodes.Successful.OK).json(result);
    }).catch(error => {
      next(error);
    });

  }

  @httpGet("/admin", checkAuth)
  private async getUsers(@request() req: Request, @response() res: Response, @next() next: NextFunction)
  {

  }
}
