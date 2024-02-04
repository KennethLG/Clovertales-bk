import { Post } from "src/domain/entities/post";
import PostRepository from "src/domain/repositories/postRepository";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(post: Post): Promise<Post> {
    const result = await this.postRepository.create(post);
    return result;
  }

  async get(id: string): Promise<Post | undefined> {
    const result = await this.postRepository.get(id);
    return result;
  }

  async getAll(
    limit: number,
    startKey: string
  ): Promise<{ items: Post[]; lastEvaluatedKey?: string | undefined }> {
    return await this.postRepository.getAll(limit, startKey);
  }

  async delete(id: string): Promise<void> {
    return await this.postRepository.delete(id);
  }

  async update(post: Post): Promise<Post | undefined> {
    const newPost = new Post();
    newPost.updatedAt = new Date().toISOString();
    newPost.content = post.content;
    newPost.title = post.title;
    newPost.description = post.description;
    newPost.imageUrl = post.imageUrl;

    const result = await this.postRepository.update(post.id, newPost);
    return result;
  }
}
