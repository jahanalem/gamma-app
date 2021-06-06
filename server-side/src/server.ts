import { PostCategory } from "./Gamma.Models/postCategory";
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import morgan from "morgan";
import * as bodyParser from "body-parser";
import TYPES from "./Gamma.Constants/types";

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

//import "./Gamma.Application/controllers/populationController";


import {
  IPostRepository,
  PostRepository,
} from "./Gamma.DataAccess/postRepository";
import { IPostService } from "./Gamma.Services/interfaces/IPostService";
import { PostService } from "./Gamma.Services/postService";

let container = new Container();
container.bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository);
container.bind<IPostService>(TYPES.IPostService).to(PostService);
//import { container } from "./inversify.config";

import "./Gamma.Application/controllers/postController";

const cors = require("cors");
//const session = require('client-sessions');
//const api = require("./Gamma.Application/api/index");

//const app = express();
const port = process.env.PORT || 3000;

// config sessions
/*
app.use(session({
    cookieName: 'session',
    secret: '',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
*/

// config routes
//app.use(api);

// error handling
/*
app.use(function (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if ((err as any).sqlMessage) {
    res.status(500).send({ message: `THE ERROR: ${(err as any).sqlMessage}` });
  } else {
    res.status(500).send(err);
  }
});
*/

const configFn = (app: express.Application) => {
  var logger = morgan("combined");
  app.use(logger);
  // config express
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("assets"));
  app.use(express.static(__dirname + "/"));
};

const errorConfigFn = (app: express.Application) => {
  app.use(
    (
      err: ErrorRequestHandler,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  );
};

let inversifyExpressServer = new InversifyExpressServer(container, null, {
  rootPath: "/api",
});
inversifyExpressServer
  .setConfig(configFn)
  .setErrorConfig(errorConfigFn)
  .build()
  .listen(port, () => {
    console.log("welcome to my app!");
  });

module.exports = inversifyExpressServer;
