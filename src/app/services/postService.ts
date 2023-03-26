import { Post } from "src/domain/entities/post";
import PostRepository from "src/domain/repositories/postRepository";
import { CreatePostDto, UpdatePostDto } from "src/presentation/dto/postDto";
import { NotFoundError, BadRequestError } from "src/presentation/utils/customError";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(post: CreatePostDto): Promise<Post> {
    const newPost = Post.fromData(post);

    const result = await this.postRepository.create(newPost);
    return result;
  }

  async get(id: string): Promise<Post> {
    const result = await this.postRepository.get(id);

    if (!result) {
      throw new NotFoundError(`Post ${id} not found`);
    }

    return result;
  }

  async getAll(): Promise<Post[]> {
    return await this.postRepository.getAll();
  }

  async delete(id: string): Promise<void> {
    return await this.postRepository.delete(id);
  }

  async update(post: UpdatePostDto): Promise<Post> {

    const newPost = Post.fromData(post);
    newPost.update({
      ...post
    })

    const result = await this.postRepository.update(post.id, newPost);

    if (!result) {
      throw new BadRequestError("An error occurred while updating");
    }

    return result;
  }
}
