import { injectable } from "inversify";
import { IPost, Post } from "../Gamma.Models/post";
import { ApplicationDbContext } from "./applicationDbContext";

export interface IPostRepository {
  Create: (post: IPost) => Promise<void>;
  GetAll: () => Promise<any>;
  GetById: (id: number) => Promise<Post>;
  Delete: (id: number) => Promise<any>;
}

@injectable()
export class PostRepository implements IPostRepository {
  constructor() {}

  public async Create(post: IPost) {
    //const id = uuid();
    console.log("<<< DataAccess Layer  start>>>");
    await ApplicationDbContext.db.execute(
      `INSERT INTO post (Title, Summary, Description, IsActive, IsPublished, IsActiveNewComment) 
                  VALUES (?,?,?,?,?,?)`,
      [
        post.Title,
        post.Summary,
        post.Description,
        post.IsActive,
        post.IsPublished,
        post.IsActiveNewComment,
      ]
    );

    console.log("<<< DataAccess Layer  finish>>>");
    //return id;
  }

  public async GetAll() {
    let data = await ApplicationDbContext.db.execute("SELECT * FROM post");
    return data[0];
  }

  public async GetById(id: number) {
    const data = await ApplicationDbContext.db.execute(
      "SELECT * FROM post WHERE Id = ?",
      [id]
    );

    return data[0];
  }

  public async Delete(id: number) {
    const data = await ApplicationDbContext.db.execute(
      "DELETE FROM post WHERE id = ?",
      [id]
    );

    return data;
  }
}
