import { IRole, Role } from "./../../Gamma.Models/role";
import { BaseController } from "./baseController";
import { Request, Response } from "express";

import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    request,
    response,
} from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../../Gamma.Constants/types";
import { IRoleService } from "../../Gamma.Services/interfaces/IRoleService";

@controller("/roles")
export class RoleController extends BaseController {
    constructor(@inject(TYPES.IRoleService) private roleService: IRoleService) {
        super();
    }

    //#region CREATE OPERATION

    @httpPost("/create")
    private async createRole(@request() req: Request, @response() res: Response) {
        if (Array.isArray(req.body)) {
            let roles = req.body as IRole[];
            roles.forEach(role => {
                role.NormalizedName = role.Name.toUpperCase();
            });
            const result = await this.roleService.CreateMany(roles);

            res.status(200).json(result);
        }
        else {
            console.log("Role(req.body):", req.body);
            const { Name, Description } = req.body;
            const newRole = new Role(Name, Description);
            const result = await this.roleService.Create(newRole);

            res.status(200).json(result);
        }
    }

    //#endregion

    // #region READ OPERATIONS

    @httpGet("/")
    private async getAll(@request() req: Request, @response() res: Response) {
        const result = await this.roleService.GetAll();

        res.status(200).json(result);
    }

    @httpGet("/:id")
    private async getById(@request() req: Request, @response() res: Response) {
        const id = req.params.id;
        const result = await this.roleService.GetById(id);

        res.status(200).json(result);
    }

    // #endregion

    //#region UPDATE OPERATION

    @httpPut("/update/:id")
    private async update(@request() req: Request, @response() res: Response) {
        const id = req.params.id;
        const { title } = req.body;
        let uRole = new Role(title);
        const result = await this.roleService.Update(id, uRole);

        res.status(200).json(result);
    }

    //#endregion

    //#region DELETE OPERATION

    @httpDelete("/delete/:id")
    private async deletePost(@request() req: Request, @response() res: Response) {
        const id = req.params.id;
        const result = await this.roleService.Delete(id);

        res.status(204).json(result);
    }

    //#endregion
}
