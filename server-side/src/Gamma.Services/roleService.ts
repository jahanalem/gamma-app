import { IRoleService } from "./interfaces/IRoleService";
import { BaseService } from "./baseService";
import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { IRoleRepository } from "../Gamma.DataAccess/roleRepository";
import { IRole, Role } from "../Gamma.Models/role";

@injectable()
export class RoleService extends BaseService implements IRoleService {
  constructor(@inject(TYPES.IRoleRepository) private RoleRepository: IRoleRepository) {
    super();
  }


  public async GetAll(): Promise<Role[]> {
    return await this.RoleRepository.GetAll();
  }


  public async GetById(id: string): Promise<Role> {
    return await this.RoleRepository.GetById(id);
  }


  public async GetRoleByRoleName(roleName: string = "Contributor"): Promise<{ Id: string, NormalizedName: string }> {
    return await this.RoleRepository.GetRoleByRoleName(roleName);
  }


  public async Create(role: IRole): Promise<Role> {
    return await this.RoleRepository.Create(role);
  }


  public async CreateMany(roles: IRole[]): Promise<number> {
    return await this.RoleRepository.CreateMany(roles);
  }


  public async Delete(id: string): Promise<Role> {
    return await this.RoleRepository.Delete(id);
  }


  public async Update(id: string, role: IRole): Promise<Role> {
    return await this.RoleRepository.Update(id, role);
  }
}
