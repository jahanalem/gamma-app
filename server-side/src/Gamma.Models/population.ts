export interface IPopulation {
  country: String;
  population: Number;
  year: Number;
}

export class Population implements IPopulation {
  country: String;
  population: Number;
  year: Number;

  constructor(country: String, population: Number, year: Number) {
    this.country = country;
    this.population = population;
    this.year = year;
  }
}
