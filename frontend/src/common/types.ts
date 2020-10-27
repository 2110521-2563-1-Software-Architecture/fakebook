export type User = {
  _id: string;
  username: string;
  email?: string;
  fullname: string;
  avatar?: string;
};

export type Post = {
  _id: string;
  username: string;
  fullname: string;
  avatar?: string;
  dateTime: string;
  content: string;
  media?: string;
};

export type SharedPost = {
  _id: string;
  username: string;
  fullname: string;
  avatar?: string;
  dateTime: string;
  content?: string;
  sourcePostId: string;
  sourceUsername: string;
  sourceFullname: string;
  sourceAvatar?: string;
  sourceDateTime: Date;
  sourceContent: string;
  sourceMedia?: string;
};
