export type User = {
  username: string;
  email: string;
  fullname: string;
  avatar: string;
};

export type Post = {
  username: string;
  fullname: string;
  avatar?: string;
  postId: string;
  content: string;
  time: string;
  media?: string;
  sourcePostId?: string;
  sourceUsername?: string;
  sourceFullname?: string;
  sourceAvatar?: string;
  sourceContent?: string;
  sourceMedia?: string;
};
