import { injectable } from "inversify";
import { v4 } from "uuid";
import { postTagMapping } from "../Gamma.Common/types/dataTypes";
import { IPost, Post } from "../Gamma.Models/post";
import { ApplicationDbContext } from "./applicationDbContext";
import { BaseRepository } from "./baseRepository";
//const { performance } = require('perf_hooks');

const colors = require('chalk');

let validate = require('uuid-validate');

export interface IPostRepository {
  Create: (post: IPost) => Promise<Post>;
  GetAll: () => Promise<Post[]>;
  GetById: (id: string) => Promise<Post>;
  GetByTagId: (tagId: string) => Promise<IPost[]>;
  GetByCategoryId(catId: string): Promise<IPost[]>
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

    post.TagIds?.map(tag => postTagIds.push({ PostId: postId, TagId: tag }));

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
    const results = await ApplicationDbContext.Prisma.post.findMany({
      include: { Tags: { include: { Tag: true } } },
    })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    const result = results.map(post => {
      return { ...post, Tags: post.Tags.map(tag => tag.Tag) }
    })

    return (result as unknown as IPost[]);
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


  public async GetByTagId(tagId: string): Promise<IPost[]> {
    const results = await ApplicationDbContext.Prisma.post.findMany({
      where: { Tags: { some: { Tag: { Id: tagId } } } },
      include:
      {
        Tags:
        {
          include:
          {
            Tag: true
          }
        }
      },
    })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    const result = results.map(post => {
      return { ...post, Tags: post.Tags.map(tag => tag.Tag) }
    })

    return (result as unknown as IPost[]);
  }


  public async GetByCategoryId(catId: string): Promise<IPost[]> {
    const results = await ApplicationDbContext.Prisma.post.findMany({
      where: { CategoryId: catId },
      include:
      {
        Tags:
        {
          include:
          {
            Tag: true
          }
        }
      },
    })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    const result = results.map(post => {
      return { ...post, Tags: post.Tags.map(tag => tag.Tag) }
    })

    return (result as unknown as IPost[]);
  }


  public async Delete(id: string) {
    const data = await ApplicationDbContext.Prisma.post
      .delete({
        where: { Id: id },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

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
