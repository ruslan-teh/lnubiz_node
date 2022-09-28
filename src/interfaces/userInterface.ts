import { ICommonFields } from './commonFields';

export interface IUser extends ICommonFields {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}

export interface IUserRegistration{
    email: string,
    password: string,
    firstName: string,
    lastName: string
}
