import { Container } from "inversify";
import {
  IPostRepository,
  PostRepository,
} from "./Gamma.DataAccess/postRepository";
import TYPES from "./Gamma.Constants/types";
import { IPostService } from "./Gamma.Services/interfaces/IPostService";
import { PostService } from "./Gamma.Services/postService";
import { TagService } from "./Gamma.Services/tagService";
import { ITagService } from "./Gamma.Services/interfaces/ITagService";
import {
  ITagRepository,
  TagRepository,
} from "./Gamma.DataAccess/tagRepository";

let container = new Container();

container.bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository);
container.bind<IPostService>(TYPES.IPostService).to(PostService);
container.bind<ITagRepository>(TYPES.ITagRepository).to(TagRepository);
container.bind<ITagService>(TYPES.ITagService).to(TagService);

export { container };
