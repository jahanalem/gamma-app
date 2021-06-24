import { ICategory } from './../../Gamma.Models/category';
import { inject, injectable } from "inversify";
import TYPES from "../../Gamma.Constants/types";
import { ICategoryService } from "../../Gamma.Services/interfaces/ICategoryService";
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
import { Category } from "../../Gamma.Models/category";

@controller("/categories")
export class CategoryController extends BaseController {
  constructor(
    @inject(TYPES.ICategoryService) private categoryService: ICategoryService
  ) {
    super();
  }

  //#region CREATE OPERATION

  @httpPost("/create")
  private async createCategory(
    @request() req: Request,
    @response() res: Response
  ) {
    console.log("CategoryController");
    if (Object.keys(req.body).length > 1) {
      const result = await this.categoryService.CreateMany(req.body);
      res.status(200).json(result);
    }
    else {
      const { title, isActive, parentId } = req.body;
      const newCategory = new Category(title, isActive, parentId);
      const result = await this.categoryService.Create(newCategory);
      res.status(200).json(result);
    }
  }

  //#endregion

  // #region READ OPERATIONS

  @httpGet("/")
  private async getAll(@request() req: Request, @response() res: Response) {
    const result = await this.categoryService.GetAll();

    res.status(200).json(result);
  }

  @httpGet("/:id")
  private async getById(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const result = await this.categoryService.GetById(id);

    res.status(200).json(result);
  }

  // #endregion

  //#region UPDATE OPERATION

  @httpPut("/update/:id")
  private async update(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const { title, isActive, parentId } = req.body;
    let uCategory = new Category(title, isActive, parentId);

    const result = await this.categoryService.Update(id, uCategory);

    res.status(200).json(result);
  }

  //#endregion

  //#region DELETE OPERATION

  @httpDelete("/delete/:id")
  private async deletePost(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const result = await this.categoryService.Delete(id);

    res.status(204).json(result);
  }

  //#endregion
}
