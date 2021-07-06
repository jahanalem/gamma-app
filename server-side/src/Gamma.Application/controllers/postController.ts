import { BaseController } from "./baseController";
import { json, Request, Response } from "express";
import { IPost, Post } from "../../Gamma.Models/post";
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
import { USERROLES } from "../../Gamma.Constants/roleMembers";

const checkAuth = require('../middleware/checkAuthMiddleware');

@controller("/posts")
export class PostController extends BaseController {
  constructor(@inject(TYPES.IPostService) private pService: IPostService) {
    super();
  }


  @httpDelete("/delete/:id")
  private async deletePost(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    await this.pService.Delete(id);

    res.status(204).json();
  }


  @httpPost("/create")
  private async create(@request() req: Request, @response() res: Response) {
    let title: string = req.body.Title;
    let summary: string = req.body.Summary;
    let description: string = req.body.Description;
    let isActive: boolean = req.body.IsActive;
    let isPublished: boolean = req.body.IsPublished;
    let isActiveNewComment: boolean = req.body.IsActiveNewComment;
    let authorId: string = req.body.AuthorId;
    let categoryId: string = req.body.CategoryId;
    let tagIds: string[] = req.body.TagIds;

    let x = new Post(title,
      summary,
      description,
      isActive,
      isPublished,
      isActiveNewComment,
      authorId,
      categoryId,
      tagIds);

    let result = await this.pService.Create(x);

    res.status(200).json(result);
  }


  @httpGet("/:id")
  private async getById(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const data = await this.pService.GetById(id);

    res.status(200).json(data);
  }


  @httpGet("/tag/:tagId")
  private async getByTagId(@request() req: Request, @response() res: Response) {
    const tagId = req.params.tagId;
    const data = await this.pService.GetByTagId(tagId);

    res.status(200).json(data);
  }


  @httpGet("/category/:catId")
  private async getByCategoryId(@request() req: Request, @response() res: Response) {
    const catId = req.params.catId;
    const data = await this.pService.GetByCategoryId(catId);

    res.status(200).json(data);
  }


  @httpGet("/")
  private async getAll(@request() req: Request, @response() res: Response) {
    const data = await this.pService.GetAll();

    res.status(200).json(data);
  }

  @httpGet("/search/:term")
  private async searchInPosts(@request() req: Request, @response() res: Response) {
    const term = req.params.term;
    const data = await this.pService.FindBySearchExpression(term);
    
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
      categoryId
    } = req.body;
    let p = new Post(
      title,
      summary,
      description,
      isActive,
      isPublished,
      isActiveNewComment,
      authorId,
      categoryId
    );
    const result = await this.pService.Update(id, p);

    res.status(200).json(result);
  }
}
