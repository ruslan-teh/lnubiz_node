import jwt from 'jsonwebtoken';

import { DeleteResult } from 'typeorm';
import { IToken, ITokenPair, IUserPayload } from '../interfaces';
import { tokenRepository } from '../repositories';
import { config } from '../config';

class TokenService {
    public createTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );
        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveTokenPair(userId: number, accessToken: string, refreshToken:string): Promise<ITokenPair> {
        const tokenPairFromDB = await tokenRepository.findTokenByUserId({ userId });

        if (tokenPairFromDB) {
            tokenPairFromDB.accessToken = accessToken;
            tokenPairFromDB.refreshToken = refreshToken;
            return tokenRepository.saveTokenPair(tokenPairFromDB);
        }

        return tokenRepository.saveTokenPair({ userId, accessToken, refreshToken });
    }

    verifyToken(authToken:string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY as string;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY as string;
        }

        if (tokenType === 'action'){
            secretWord = config.SECRET_ACTION_KEY as string;
        }

        return jwt.verify(authToken, secretWord) as IUserPayload;
    }

    public async deleteTokenPairByParams(findObject: Partial<IToken>): Promise<DeleteResult> {
        const tokenFromDB = await tokenRepository.findTokenByUserId(findObject);

        if (!tokenFromDB) {
            throw new Error('user is logout');
        }

        return tokenRepository.deleteTokenPairByParams({ });
    }

    public generateActionToken(payload: IUserPayload): string {
        return jwt.sign(payload, config.SECRET_ACTION_KEY as string, { expiresIn: config.EXPIRES_IN_ACTION });
    }
}

export const tokenService = new TokenService();
