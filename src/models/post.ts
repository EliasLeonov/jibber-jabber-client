export default interface Post {
  id: string;
  text: string;
  author: {
    id: string;
    username: string;
  };
  likes: number;
  isLiked: boolean;
  timestamp: string;
}
