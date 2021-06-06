import { Container } from "inversify";
import { IPostRepository, PostRepository } from "./Gamma.DataAccess/postRepository";
import TYPES from "./Gamma.Constants/types";
import { IPostService } from "./Gamma.Services/interfaces/IPostService";
import { PostService } from "./Gamma.Services/postService";

let container = new Container();

container.bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository);
container.bind<IPostService>(TYPES.IPostService).to(PostService);

export { container };
