import { Comment } from "./../../Gamma.Models/comment";
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
import { ICommentService } from "../../Gamma.Services/interfaces/ICommentService";

@controller("/comments")
export class CommentController extends BaseController {
  constructor(
    @inject(TYPES.ICommentService) private commentService: ICommentService
  ) {
    super();
  }

  //#region CREATE OPERATION

  @httpPost("/create")
  private async createComment(
    @request() req: Request,
    @response() res: Response
  ) {
    const { description, writtenById, postId, parentId } = req.body;
    const newComment = new Comment(description, postId, writtenById, parentId);
    const result = await this.commentService.Create(newComment);
    res.status(200).json(result);
  }

  //#endregion

  // #region READ OPERATIONS

  @httpGet("/")
  private async getAll(@request() req: Request, @response() res: Response) {
    const result = await this.commentService.GetAll();

    res.status(200).json(result);
  }

  @httpGet("/:id")
  private async getById(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const result = await this.commentService.GetById(+id);

    res.status(200).json(result);
  }

  @httpGet("/post/:postId")
  private async getCommentsByPostId(
    @request() req: Request,
    @response() res: Response
  ) {
    const postId = req.params.postId;
    const result = await this.commentService.GetCommentsByPostId(+postId);

    res.status(200).json(result);
  }

  @httpGet("/user/:userId")
  private async getCommentsByUserId(
    @request() req: Request,
    @response() res: Response
  ) {
    const userId = req.params.userId;
    const result = await this.commentService.GetCommentsByUserId(+userId);

    res.status(200).json(result);
  }

  // #endregion

  //#region UPDATE OPERATION

  @httpPut("/update/:id")
  private async update(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const { description, postId, writtenById, parentId } = req.body;
    let uComment = new Comment(description, postId, writtenById, parentId);
    const result = await this.commentService.Update(+id, uComment);

    res.status(200).json(result);
  }

  //#endregion

  //#region DELETE OPERATION

  @httpDelete("/delete/:id")
  private async deletePost(@request() req: Request, @response() res: Response) {
    const id = req.params.id;
    const result = await this.commentService.Delete(+id);

    res.status(204).json(result);
  }

  //#endregion
}
