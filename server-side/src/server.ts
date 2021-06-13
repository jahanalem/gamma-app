import * as express from "express";
const cors = require("cors");
import morgan from "morgan";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { container } from "./inversify.config";

import "./Gamma.Application/controllers/postController";
import "./Gamma.Application/controllers/tagController";
import "./Gamma.Application/controllers/categoryController";
import "./Gamma.Application/controllers/commentController";

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
