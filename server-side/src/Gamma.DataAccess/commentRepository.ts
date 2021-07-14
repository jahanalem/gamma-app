import { IComment, Comment } from "../Gamma.Models/comment";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { id, injectable } from "inversify";

export interface ICommentRepository {
  Create: (comment: IComment) => Promise<Comment>;
  GetAll: () => Promise<Comment[]>;
  GetById: (id: string) => Promise<Comment>;
  GetCommentsByUserId: (userId: string) => Promise<Comment[]>;
  GetCommentsByPostId: (postId: string) => Promise<Comment[]>;
  Update: (id: string, comment: IComment) => Promise<Comment>;
  Delete: (id: string) => Promise<Comment>;
}

@injectable()
export class CommentRepository extends BaseRepository implements ICommentRepository {
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


  public async GetById(id: string): Promise<Comment> {
    const result = await ApplicationDbContext.Prisma.comment
      .findFirst({
        where: { Id: id },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }


  public async GetCommentsByPostId(postId: string): Promise<Comment[]> {
    const result = await ApplicationDbContext.Prisma.comment
      .findMany({
        where: { PostId: postId },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  
  public async GetCommentsByUserId(userId: string): Promise<Comment[]> {
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

  public async Update(id: string, comment: IComment): Promise<Comment> {
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

  public async Delete(id: string): Promise<Comment> {
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
