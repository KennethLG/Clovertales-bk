import { Post } from "../entities/post";

export default interface PostRepository {

  create: (post: Post) => Promise<Post>;
}