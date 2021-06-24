import { UserController } from './Gamma.Application/controllers/userController';
import * as express from "express";
const cors = require("cors");
import morgan from "morgan";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";

import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";

import { container } from "./inversify.config";

import "./Gamma.Application/controllers/postController";
import "./Gamma.Application/controllers/tagController";
import "./Gamma.Application/controllers/categoryController";
import "./Gamma.Application/controllers/commentController";
import "./Gamma.Application/controllers/userController";
import "./Gamma.Application/controllers/roleController";


const port = process.env.PORT || 3000;

// config sessions

// config routes

// error handling

const configFn = (app: express.Application) => {
  var logger = morgan("combined");
  app.use(logger as express.RequestHandler);
  app.use(cors());
  app.use(express.json() as express.RequestHandler);
  app.use(express.urlencoded({ extended: true }) as express.RequestHandler);
  app.use(express.static("assets"));
  app.use(express.static(__dirname + "/"));
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
  });

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
      res.status(500).send(err);
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
    console.log(`Server listen on port ${port}. welcome to Gamma app!`);
  });

module.exports = inversifyExpressServer;
