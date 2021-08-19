
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class InputLogin {
    rut: string;
    password: string;
}

export class UserData {
    rut: string;
    name: string;
    email: string;
    password: string;
    phone: string;
}

export class UserDataEdit {
    rut: string;
    name: string;
    email: string;
    phone: string;
}

export abstract class IMutation {
    abstract login(input?: Nullable<InputLogin>): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract createUser(input?: Nullable<UserData>): Nullable<User> | Promise<Nullable<User>>;

    abstract editUser(id?: Nullable<string>, input?: Nullable<UserDataEdit>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export class LoginResponse {
    token: string;
    user?: Nullable<User>;
}

export abstract class IQuery {
    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export class User {
    id: string;
    rut: string;
    name: string;
    email: string;
    password: string;
    passwordSalt: string;
    phone: string;
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

type Nullable<T> = T | null;
