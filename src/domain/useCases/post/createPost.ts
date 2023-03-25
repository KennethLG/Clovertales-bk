import { Post } from "src/domain/entities/post";

interface CreatePostInput {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
}

export default class CreatePost {
  constructor(private postService: any) {}

  async execute(input: CreatePostInput): Promise<Post> {

    const newPost = await this.postService.createPost(input);

    return newPost;
  }
}