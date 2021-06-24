import { injectable } from "inversify";
import { v4 } from "uuid";
import { postTagMapping } from "../Gamma.Common/types/dataTypes";
import { IPost, Post } from "../Gamma.Models/post";
import { ApplicationDbContext } from "./applicationDbContext";
import { BaseRepository } from "./baseRepository";

export interface IPostRepository {
  Create: (post: IPost) => Promise<Post>;
  GetAll: () => Promise<Post[]>;
  GetById: (id: string) => Promise<Post>;
  Delete: (id: string) => Promise<any>;
  Update: (id: string, post: IPost) => Promise<Post>;
}

@injectable()
export class PostRepository extends BaseRepository implements IPostRepository {
  constructor() {
    super();
  }

  public async Create(post: IPost): Promise<Post> {

    let postId = v4();
    let postTagIds: postTagMapping[] = [];
    post.Tags?.map(tag => postTagIds.push({ PostId: postId, TagId: tag.Id }));

    const transResult = await ApplicationDbContext.Prisma.$transaction([
      ApplicationDbContext.Prisma.post.create({
        data: {
          Id: postId,
          Title: post.Title,
          Summary: post.Summary,
          Description: post.Description,
          IsActive: post.IsActive,
          IsPublished: post.IsPublished,
          IsActiveNewComment: post.IsActiveNewComment,
          AuthorId: post.AuthorId,
          CategoryId: post.CategoryId,
        },
      }),
      ApplicationDbContext.Prisma.tagPostMapping.createMany({
        data: postTagIds
      })

    ]).finally(async () => {
      await ApplicationDbContext.Prisma.$disconnect();
    });

    let result = transResult as unknown as Post;

    return result;

    // const result = await ApplicationDbContext.Prisma.post
    //   .create({
    //     data: {
    //       Title: post.Title,
    //       Summary: post.Summary,
    //       Description: post.Description,
    //       IsActive: post.IsActive,
    //       IsPublished: post.IsPublished,
    //       IsActiveNewComment: post.IsActiveNewComment,
    //       AuthorId: post.AuthorId,
    //     },
    //   })
    //   .finally(async () => {
    //     await ApplicationDbContext.Prisma.$disconnect();
    //   });

    // await ApplicationDbContext.db.execute(`INSERT INTO post (Title, Summary, Description, IsActive, IsPublished, IsActiveNewComment) VALUES (?,?,?,?,?,?)`, [ post.Title, post.Summary, post.Description, post.IsActive, post.IsPublished, post.IsActiveNewComment,]);
  }

  public async GetAll(): Promise<Post[]> {
    const allUsers = await ApplicationDbContext.Prisma.post
      .findMany({
        include: {
          Comments: true,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });
    console.dir(allUsers, { depth: null });

    return allUsers;
    //let data = await ApplicationDbContext.db.execute("SELECT * FROM post");
  }

  public async GetById(id: string): Promise<Post> {
    const data = await ApplicationDbContext.Prisma.post
      .findUnique({
        where: { Id: id },
        include: { Comments: true },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return data;
    //const data = await ApplicationDbContext.db.execute("SELECT * FROM post WHERE Id = ?",[id]);
  }

  public async Delete(id: string) {
    const data = await ApplicationDbContext.Prisma.post
      .delete({
        where: { Id: id },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    //const data = await ApplicationDbContext.db.execute("DELETE FROM post WHERE id = ?",[id]);

    return data;
  }

  public async Update(id: string, post: IPost) {
    const result = await ApplicationDbContext.Prisma.post
      .update({
        where: { Id: id },
        data: {
          Title: post.Title,
          Summary: post.Summary,
          Description: post.Description,
          IsActive: post.IsActive,
          IsPublished: post.IsPublished,
          IsActiveNewComment: post.IsActiveNewComment,
          AuthorId: post.AuthorId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }
}
