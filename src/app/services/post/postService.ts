import { Post } from "src/domain/entities/post";
import PostRepository from "src/domain/repositories/postRepository";
import { CreatePostDto } from "src/presentation/dto/createPostDto";
import { v4 as uuidv4} from "uuid";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(post: CreatePostDto): Promise<Post> {
    const newPost = new Post();
    newPost.id = uuidv4();
    newPost.available = true;
    newPost.imageUrl = post.imageUrl;
    newPost.content = post.content;
    newPost.title = post.title;
    newPost.description = post.description;

    const newUser = await this.postRepository.create(newPost);
    return newUser;
  }
}
