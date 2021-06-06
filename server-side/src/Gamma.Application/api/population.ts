import { NextFunction, Request, Response } from "express";

const express = require("express");
const api = express.Router();

const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);



module.exports = api;
