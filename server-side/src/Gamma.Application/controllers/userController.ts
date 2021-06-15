import { BaseController } from "./baseController";
import { NextFunction, Request, Response } from "express";
const { body, validationResult } = require("express-validator");
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../../Gamma.Constants/types";
import { IUserService } from "../../Gamma.Services/interfaces/IUserService";
import { SignUpUserViewModel } from "../../Gamma.Models/ViewModels/signUpUserViewModel";
import { LoginUserViewModel } from "../../Gamma.Models/ViewModels/loginUserViewModel";
import { HttpError } from "../../Gamma.Common/models/httpError";

@controller("/users")
export class UserController extends BaseController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {
    super();
  }

  @httpPost("/signup")
  private async signup(@request() req: Request, @response() res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
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
    const result = await this.userService.Signup(candidateUser);

    res.status(200).json(result);
  }

  @httpPost("/login")
  private async login(@request() req: Request, @response() res: Response) {
    const { email, password } = req.body;
    const user = new LoginUserViewModel(email, password);
    this.userService.Login(user);
    res.status(200).json();
  }
}
