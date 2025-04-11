// types.ts
export type Song = {
  name: string;
  imageUri: string;
};

export type User = {
  imageUri: string;
  username?: string; // Optional if username is at the post level
};

export type Post = {
  id: number;
  username: string;
  user: User;
  description: string;
  song: Song;
  imageUri: string;
  likes: number;
  comments: number;
  shares: number;
  videoUri: string;
};
