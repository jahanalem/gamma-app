import { Request, Response } from "express";
const db = require("../model/database");

//const config = require('config');
const population = require("../model/population");

//exports.create = function (req: Request, res: Response) {};

exports.getAll = async function (req: Request, res: Response) {
  console.log("<<<<<<<<<<< I AM /controller/populationController.js >>>>>>>>>>>>");
  //const data = await population.get();
  //console.log("<<<<<    THE RESULTS    >>>> ",data);

  let data = null;
  try {
    data = await db.execute("SELECT * FROM population_years");
  } catch (e) {
    console.log(e);
  }

  res.status(200).send(data);
};

exports.getByName = async function (req: Request, res: Response) {
  const name = req.params.name;
  console.log("I AM /controller/populationController.js/getByName");
  const data = await population.get(name);
  res.status(200).send(data);
};
