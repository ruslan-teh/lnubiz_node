import { ICommonFields } from './commonFields';
import { IUserPayload } from './userInterface';

export interface IToken extends ICommonFields{
    accessToken: string,
    refreshToken: string,
    userId: number,
}

export interface ITokenDataToSave {
    accessToken: string,
    refreshToken: string,
    userId: number
}

export interface ITokenPair {
    accessToken: string,
    refreshToken: string,
}

export type ITokenData = ITokenPair & IUserPayload;
