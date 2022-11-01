export interface IUserCreate {
    email: string,
    password: string,
    name: string,
    username: string,
    position:string,
    imageUrl?: string
}

export interface IUserLogin {
    email: string, 
    passworld: string
}

export interface IUserUpdate {
    email?: string,
    password?: string,
    name?: string,
    username?: string,
    position?:string,
    imageUrl?: string
}
