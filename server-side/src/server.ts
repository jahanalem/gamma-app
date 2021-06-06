import * as express from "express";
const cors = require("cors");
import morgan from "morgan";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { container } from "./inversify.config";

import "./Gamma.Application/controllers/postController";

const port = process.env.PORT || 3000 ;

// config sessions

// config routes

// error handling


const configFn = (app: express.Application) => {
  var logger = morgan("combined");
  app.use(logger);
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
    console.log(`Server listen on port ${port}. welcome to Gamma app!`);
  });

module.exports = inversifyExpressServer;
