import { ICommonFields } from './commonFields';
import { IUserPayload } from './userInterface';
import {actionTokenEnum} from "../config";

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

export interface IActionToken extends ICommonFields{
    userId: number;
    type: actionTokenEnum;
    actionToken: string;
}

export interface IActionTokenForSave {
    userId: number;
    type: actionTokenEnum;
    actionToken: string;
}

export type ITokenData = ITokenPair & IUserPayload;
