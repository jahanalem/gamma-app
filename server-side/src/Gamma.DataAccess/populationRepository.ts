//var db = require("./database");
import { IPopulation } from "../Gamma.Models/population";
import { ApplicationDbContext } from "./applicationDbContext";

//import uuid = require("uuidv1");

export class PopulationRepository {
  constructor() {}

  public static async create(population: IPopulation) {
    //const id = uuid();
    console.log("<<< DataAccess Layer  start>>>");
    await ApplicationDbContext.db.execute(
      `INSERT INTO population_years (country, population, year) 
              VALUES (?,?,?)`,
      [population.country, population.population, population.year]
    );

    console.log("<<< DataAccess Layer  finish>>>");
    //return id;
  }

  public static async getAll() {
    let data = await ApplicationDbContext.db.execute(
      "SELECT * FROM population_years"
    );
    return data;
  }

  public static async getByName(name: String) {
    const data = await ApplicationDbContext.db.execute(
      "SELECT * FROM population_years WHERE country = ?",
      [name]
    );

    return data;
  }

  public static async delete(name: String) {
    const data = await ApplicationDbContext.db.execute(
      "DELETE FROM population_years WHERE country = ?",
      [name]
    );

    return data;
  }
}

//const moment = require('moment');

// exports.delete = function (name) {
//     // TODO
// }
