import PostService from "src/app/services/postService";
import { Post } from "src/domain/entities/post";
import { CreatePostDto } from "src/presentation/dto/postDto";
import { v4 as uuidv4 } from "uuid";

export default class CreatePost {
  constructor(private postService: PostService) {}

  async execute(post: CreatePostDto): Promise<Post> {
    const newPost = new Post();
    newPost.createdAt = new Date().toISOString();
    newPost.updatedAt = new Date().toISOString();
    newPost.id = uuidv4();
    newPost.content = post.content;
    newPost.description = post.description;
    newPost.title = post.title;

    return await this.postService.create(newPost);
  }
}