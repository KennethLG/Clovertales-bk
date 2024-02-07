type PostCreateAttributes = Pick<
  Post,
  "content" | "description" | "title" | "imageUrl"
>;

type PostUdpateAttributes = Pick<
  Post,
  "id" | "content" | "description" | "title" | "imageUrl"
>;
export class Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  available: boolean;

  static create(post: PostCreateAttributes) {
    const newPost = new Post();
    newPost.createdAt = new Date().toISOString();
    newPost.updatedAt = new Date().toISOString();
    newPost.id = "POST";
    newPost.content = post.content;
    newPost.description = post.description;
    newPost.title = post.title;
    newPost.imageUrl = post.imageUrl;
    return newPost;
  }

  static update(post: PostUdpateAttributes) {
    const newPost = new Post();
    newPost.updatedAt = new Date().toISOString();
    newPost.id = post.id;
    newPost.content = post.content;
    newPost.title = post.title;
    newPost.description = post.description;
    newPost.imageUrl = post.imageUrl;
    return newPost;
  }
}
