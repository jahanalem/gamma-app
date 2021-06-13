import { IComment, Comment } from "../Gamma.Models/comment";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { id, injectable } from "inversify";

export interface ICommentRepository {
  Create: (comment: IComment) => Promise<Comment>;
  GetAll: () => Promise<Comment[]>;
  GetById: (id: number) => Promise<Comment>;
  GetCommentsByUserId: (userId: number) => Promise<Comment[]>;
  GetCommentsByPostId: (postId: number) => Promise<Comment[]>;
  Update: (id: number, comment: IComment) => Promise<Comment>;
  Delete: (id: number) => Promise<Comment>;
}

@injectable()
export class CommentRepository
  extends BaseRepository
  implements ICommentRepository
{
  constructor() {
    super();
  }

  //#region CREATE REGION

  public async Create(comment: IComment): Promise<Comment> {
    const result = await ApplicationDbContext.Prisma.comment
      .create({
        data: {
          Description: comment.Description,
          WrittenById: comment.WrittenById,
          PostId: comment.PostId,
          ParentId: comment.ParentId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion

  //#region READ REGION

  public async GetAll(): Promise<Comment[]> {
    const result = await ApplicationDbContext.Prisma.comment
      .findMany()
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  public async GetById(id: number): Promise<Comment> {
    const result = await ApplicationDbContext.Prisma.comment
      .findFirst({
        where: { Id: id },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  public async GetCommentsByPostId(postId: number): Promise<Comment[]> {
    const result = await ApplicationDbContext.Prisma.comment
      .findMany({
        where: { PostId: postId },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  public async GetCommentsByUserId(userId: number): Promise<Comment[]> {
    const result = await ApplicationDbContext.Prisma.comment
      .findMany({
        where: { WrittenById: userId },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion

  //#region UPDATE REGION

  public async Update(id: number, comment: IComment): Promise<Comment> {
    const result = await ApplicationDbContext.Prisma.comment
      .update({
        where: { Id: id },
        data: {
          Description: comment.Description,
          WrittenById: comment.WrittenById,
          PostId: comment.PostId,
          ParentId: comment.ParentId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion

  //#region DELETE REGION

  public async Delete(id: number): Promise<Comment> {
    const result = await ApplicationDbContext.Prisma.comment
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
