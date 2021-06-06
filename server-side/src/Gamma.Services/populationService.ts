import { inject, injectable } from "inversify";
import { PopulationRepository } from "../Gamma.DataAccess/populationRepository";
import { IPopulation } from "../Gamma.Models/population";
import { IPopulationService } from "./interfaces/IPopulationService";


@injectable()
export class PopulationService implements IPopulationService {
  constructor(//@inject("IPopulationService") populationRepository: IPopulationRepository
  ) {}

  public getAll() {
    return PopulationRepository.getAll();
  }

  public async getByName(name: String) {
    return PopulationRepository.getByName(name);
  }

  public async create(population: IPopulation) {
    if (population.year > 3000) {
      population.year = 2022;
    }
    console.log("<<< ServiceLayer >>>");
    return await PopulationRepository.create(population);
  }

  public async delete(name: String) {
    return PopulationRepository.delete(name);
  }
}
