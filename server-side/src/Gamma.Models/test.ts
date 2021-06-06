const db = require("./database");
const uuid = require("uuidv1");
//const moment = require('moment');

exports.create = function (population: any) {
  const id = uuid();

  // TODO:

  return id;
};

exports.get = async function () {
  // TODO
  console.log("<<<<<<<<<< I AM model/population.js >>>>>>>>>>>");
  let data = null;
  try {
    data = await db.execute("SELECT * FROM population_years");
  } catch (e) {
    console.log(e);
  }
  //console.log(data);
  return data;
};

exports.get = async function (name: String) {
  // TODO
  const data = await db.execute(
    "SELECT * FROM population_years WHERE country = ?",
    [name]
  );
  //console.log(data);
  return data;
};

// exports.delete = function (name) {
//     // TODO
// }
