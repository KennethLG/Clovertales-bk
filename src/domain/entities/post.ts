export type PostCreateAttributes = Pick<
  Post,
  "content" | "description" | "title" | "imageUrl"
>;

export type PostUdpateAttributes = Pick<
  Post,
  "content" | "description" | "title" | "imageUrl" | "available"
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
    newPost.available = true;
    return newPost;
  }

  static update(base: Post, post: PostUdpateAttributes) {
    base.updatedAt = new Date().toISOString();
    base.content = post.content;
    base.imageUrl = post.imageUrl;
    base.title = post.title;
    base.description = post.description;
    base.available = post.available;
    return base;
  }
}
