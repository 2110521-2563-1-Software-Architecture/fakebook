export type User = {
  _id: string;
  username: string;
  email?: string;
  fullname: string;
  avatar?: string;
};

export type Post = {
  _id: string;
  postId: string;
  username: string;
  fullname: string;
  avatar?: string;
  dateTime: string;
  content?: string;
  media?: string;
  sourcePostId?: {
    _id: string;
    userId: {
      _id: string;
      username: string;
      fullname: string;
      avatar?: string;
    };
    dateTime: string;
    content?: string;
    media?: string;
  };
};
