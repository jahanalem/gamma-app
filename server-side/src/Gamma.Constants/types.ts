const TYPES = {
  IPostRepository: Symbol.for("IPostRepository"),
  IPostService: Symbol.for("IPostService"),

  ITagRepository: Symbol.for("ITagRepository"),
  ITagService: Symbol.for("ITagService"),

  ICategoryRepository: Symbol.for("ICategoryRepository"),
  ICategoryService: Symbol.for("ICategoryService"),

  ICommentRepository: Symbol.for("ICommentRepository"),
  ICommentService: Symbol.for("ICommentService"),
};

export default TYPES;
