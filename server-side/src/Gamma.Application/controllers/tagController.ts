import { Tag } from "./../../Gamma.Models/tag";
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
import { ITagService } from "../../Gamma.Services/interfaces/ITagService";

@controller("/tags")
export class TagController extends BaseController {
  constructor(@inject(TYPES.ITagService) private tagService: ITagService) {
    super();
  }

  //#region CREATE OPERATION

  @httpPost("/create")
  private async createTag(@request() req: Request, @response() res: Response) {
    if (Object.keys(req.body).length > 1) {
      const result = await this.tagService.CreateMany(req.body);

      res.status(200).json(result);
    }
    else {
      const { title } = req.body;
      const newTag = new Tag(title);
      const result = await this.tagService.Create(newTag);

      res.status(200).json(result);
    }

  }

  //#endregion

  // #region READ OPERATIONS

  @httpGet("/")
  private async getAll(@request() req: Request, @response() res: Response) {
    const result = await this.tagService.GetAll();

    res.status(200).json(result);
  }

  @httpGet("/:id")
  private async getById(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const result = await this.tagService.GetById(id);

    res.status(200).json(result);
  }

  // #endregion

  //#region UPDATE OPERATION

  @httpPut("/update/:id")
  private async update(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const { title } = req.body;
    let uTag = new Tag(title);
    const result = await this.tagService.Update(id, uTag);

    res.status(200).json(result);
  }

  //#endregion

  //#region DELETE OPERATION

  @httpDelete("/delete/:id")
  private async deletePost(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const result = await this.tagService.Delete(id);

    res.status(204).json(result);
  }

  //#endregion
}
