import { IRole, Role } from "../../Gamma.Models/role";

export interface IRoleService {
  GetAll: () => Promise<Role[]>;
  GetById: (id: string) => Promise<Role>;
  Create: (role: IRole) => Promise<Role>;
  Delete: (id: string) => Promise<Role>;
  Update: (id: string, role: IRole) => Promise<Role>;
  CreateMany(roles: IRole[]): Promise<number>;
  GetRoleByRoleName(roleName: string): Promise<{ Id: string, NormalizedName: string }>
}
