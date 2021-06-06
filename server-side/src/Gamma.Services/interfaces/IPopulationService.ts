import { IPopulation } from "../../Gamma.Models/population";

export interface IPopulationService {
    getAll: () => any;
    getByName: (name: string) => any;
    create: (population: IPopulation) => any;
    delete: (name: String) => any;
  }