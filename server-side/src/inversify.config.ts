import { Container } from "inversify";
import TYPES from "./Gamma.Constants/types";

import { IUserRepository, UserRepository } from "./Gamma.DataAccess/userRepository";

import { CategoryRepository, ICategoryRepository } from "./Gamma.DataAccess/categoryRepository";

import { IPostRepository, PostRepository } from "./Gamma.DataAccess/postRepository";
import { IPostService } from "./Gamma.Services/interfaces/IPostService";
import { PostService } from "./Gamma.Services/postService";

import { TagService } from "./Gamma.Services/tagService";
import { ITagService } from "./Gamma.Services/interfaces/ITagService";
import { ITagRepository, TagRepository } from "./Gamma.DataAccess/tagRepository";

import { CategoryService } from "./Gamma.Services/CategoryService";
import { ICategoryService } from "./Gamma.Services/interfaces/ICategoryService";

import { ICommentService } from "./Gamma.Services/interfaces/ICommentService";
import { CommentService } from "./Gamma.Services/commentService";
import { CommentRepository, ICommentRepository } from "./Gamma.DataAccess/commentRepository";

import { IUserService } from "./Gamma.Services/interfaces/IUserService";
import { UserService } from "./Gamma.Services/userService";

import { IRoleRepository, RoleRepository } from "./Gamma.DataAccess/roleRepository";
import { IRoleService } from "./Gamma.Services/interfaces/IRoleService";
import { RoleService } from "./Gamma.Services/roleService";

let container = new Container();

container.bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository);
container.bind<IPostService>(TYPES.IPostService).to(PostService);

container.bind<ITagRepository>(TYPES.ITagRepository).to(TagRepository);
container.bind<ITagService>(TYPES.ITagService).to(TagService);

container.bind<ICategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);

container.bind<ICommentRepository>(TYPES.ICommentRepository).to(CommentRepository);
container.bind<ICommentService>(TYPES.ICommentService).to(CommentService);

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.IUserService).to(UserService);

container.bind<IRoleRepository>(TYPES.IRoleRepository).to(RoleRepository);
container.bind<IRoleService>(TYPES.IRoleService).to(RoleService);

export { container };
