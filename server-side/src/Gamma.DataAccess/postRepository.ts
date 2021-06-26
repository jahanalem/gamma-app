import { injectable } from "inversify";
import { v4 } from "uuid";
import { postTagMapping } from "../Gamma.Common/types/dataTypes";
import { IPost, Post } from "../Gamma.Models/post";
import { ApplicationDbContext } from "./applicationDbContext";
import { BaseRepository } from "./baseRepository";
var colors = require('colors');
const { performance } = require('perf_hooks');


let validate = require('uuid-validate');

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

    let postId = (!validate(post.Id)) ? v4() : post.Id;

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
  }

  public async GetAll(): Promise<Post[]> {
    let d1 = performance.now();
    const posts = await ApplicationDbContext.Prisma.post.findMany()
    .finally(async () => {
      await ApplicationDbContext.Prisma.$disconnect();
    });
    let d2 = performance.now();
    let deltaD = d2 - d1;
    console.log(colors.green('postRepository (delta time) with PRISMA:'), deltaD);

    // let d3 = performance.now();
    // let data = await ApplicationDbContext.db.execute("SELECT * FROM post");
    // let d4 = performance.now();
    // let delta = d4 - d3;
    
    //console.log(colors.cyan('wothout ORM:'), delta);
    //console.dir(posts, { depth: null });

    return posts;

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
          CategoryId: post.CategoryId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }
}
