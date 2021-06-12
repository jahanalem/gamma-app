import { BaseController } from "./baseController";
import { Request, Response } from "express";
import { Post } from "../../Gamma.Models/post";
import { inject } from "inversify";

import { IPostService } from "../../Gamma.Services/interfaces/IPostService";
import TYPES from "../../Gamma.Constants/types";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from "inversify-express-utils";

@controller("/posts")
export class PostController extends BaseController {
  constructor(@inject(TYPES.IPostService) private pService: IPostService) {
    super();
  }

  @httpDelete("/delete/:id")
  private async deletePost(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    await this.pService.Delete(+id);
    res.status(204).json();
  }

  @httpPost("/create")
  private async create(@request() req: Request, @response() res: Response) {
    const {
      title,
      summary,
      description,
      isActive,
      isPublished,
      isActiveNewComment,
      authorId,
    } = req.body;
    let x = new Post(
      title,
      summary,
      description,
      isActive,
      isPublished,
      isActiveNewComment,
      authorId
    );

    await this.pService.Create(x);

    res.status(200).json(x);
  }

  @httpGet("/:id")
  private async getById(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const data = await this.pService.GetById(+id);
    res.status(200).json(data);
  }

  @httpGet("/")
  private async getAll(@request() req: Request, @response() res: Response) {
    let data = await this.pService.GetAll();
    console.log(data[0]);
    res.status(200).json(data);
  }

  @httpPut("/update/:id")
  private async update(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const {
      title,
      summary,
      description,
      isActive,
      isPublished,
      isActiveNewComment,
      authorId,
    } = req.body;
    let p = new Post(
      title,
      summary,
      description,
      isActive,
      isPublished,
      isActiveNewComment,
      authorId
    );
    const result = await this.pService.Update(+id, p);
    return res.status(200).json(result);
  }
}
