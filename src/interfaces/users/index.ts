export interface IUserCreate {
  email: string;
  password: string;
  name: string;
  username: string;
  position: string;
  imageUrl?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  email?: string;
  password?: string;
  name?: string;
  username?: string;
  position?: string;
  imageUrl?: string;
}

export interface IUserWithId {
  uuid: string;
  name: string;
  username: string;
  email: string;
  password: string;
  position: string;
}
