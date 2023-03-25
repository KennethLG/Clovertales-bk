import { Post } from "src/domain/entities/post";

export default class PostService {
  constructor(private postRepository: any) {}

  async createPost(post: any): Promise<Post> {
    const newUser = await this.postRepository.create(post);
    return newUser;
  }
}