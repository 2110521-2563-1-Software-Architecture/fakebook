export type User = {
  username: string;
  email: string;
};

export type Party = {
  _id: string;
  name: string;
  noPeople: number;
  users: User[];
};
