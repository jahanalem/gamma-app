import { IRole, Role } from "../Gamma.Models/role";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { id, injectable } from "inversify";

export interface IRoleRepository {
    Create: (Role: IRole) => Promise<Role>;
    GetAll: () => Promise<Role[]>;
    GetById: (id: string) => Promise<Role>;
    Delete: (id: string) => Promise<Role>;
    Update: (id: string, Role: IRole) => Promise<Role>;
    CreateMany(Roles: IRole[]): Promise<number>;
    GetRoleByRoleName(roleName: string): Promise<{ Id: string, NormalizedName: string }>;
    GetRoleByRoleId(roleId: string): Promise<{ Id: string, NormalizedName: string }>
}

@injectable()
export class RoleRepository extends BaseRepository implements IRoleRepository {
    constructor() {
        super();
    }

    //#region CREATE REGION

    public async Create(role: IRole): Promise<Role> {
        const result = await ApplicationDbContext.Prisma.role
            .create({
                data: {
                    Name: role.Name,
                    Description: role.Description,
                    NormalizedName: role.NormalizedName
                },
            })
            .finally(async () => {
                await ApplicationDbContext.Prisma.$disconnect();
            });

        return result;
    }

    public async CreateMany(roles: IRole[]): Promise<number> {
        const result = await ApplicationDbContext.Prisma.role.createMany({
            data: roles,
            skipDuplicates: true
        })
            .finally(async () => {
                await ApplicationDbContext.Prisma.$disconnect();
            });

        return result.count;
    }

    //#endregion

    //#region READ REGION

    public async GetAll(): Promise<Role[]> {
        const result = await ApplicationDbContext.Prisma.role
            .findMany()
            .finally(async () => {
                await ApplicationDbContext.Prisma.$disconnect();
            });

        return result;
    }

    public async GetById(id: string): Promise<Role> {
        const result = await ApplicationDbContext.Prisma.role
            .findFirst({
                where: { Id: id },
            })
            .finally(async () => {
                await ApplicationDbContext.Prisma.$disconnect();
            });

        return result;
    }

    public async GetRoleByRoleName(roleName: string = "Contributor"): Promise<{ Id: string, NormalizedName: string }> {
        const normalizedRoleName = roleName.toUpperCase().trim();
        const role = await ApplicationDbContext.Prisma.role.findFirst({
            where: { NormalizedName: normalizedRoleName },
            select: { Id: true, NormalizedName: true }
        })

        return role;
    }

    public async GetRoleByRoleId(roleId: string): Promise<{ Id: string, NormalizedName: string }> {

        const role = await ApplicationDbContext.Prisma.role.findFirst({
            where: { Id: roleId },
            select: { Id: true, NormalizedName: true }
        })

        return role;
    }

    //#endregion

    //#region UPDATE REGION

    public async Update(id: string, role: IRole): Promise<Role> {
        const result = await ApplicationDbContext.Prisma.role
            .update({
                where: { Id: id },
                data: {
                    Name: role.Name,
                    NormalizedName: role.NormalizedName
                },
            })
            .finally(async () => {
                await ApplicationDbContext.Prisma.$disconnect();
            });

        return result;
    }

    //#endregion

    //#region DELETE REGION

    public async Delete(id: string): Promise<Role> {
        const result = await ApplicationDbContext.Prisma.role
            .delete({
                where: { Id: id },
            })
            .finally(async () => {
                await ApplicationDbContext.Prisma.$disconnect();
            });

        return result;
    }

    //#endregion
}
