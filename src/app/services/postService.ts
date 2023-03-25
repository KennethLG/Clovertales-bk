import { Post } from "src/domain/entities/post";
import PostRepository from "src/domain/repositories/postRepository";
import { CreatePostDto } from "src/presentation/dto/postDto";
import { NotFoundError } from "src/presentation/utils/customError";
import { v4 as uuidv4} from "uuid";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(post: CreatePostDto): Promise<Post> {
    const newPost = new Post();
    newPost.id = uuidv4();
    newPost.available = true;
    newPost.imageUrl = post.imageUrl;
    newPost.content = post.content;
    newPost.title = post.title;
    newPost.description = post.description;

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
}
