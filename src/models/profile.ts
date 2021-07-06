export default interface Profile {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  mail: string;
  posts: [];
  followers: [];
  following: [];
}
