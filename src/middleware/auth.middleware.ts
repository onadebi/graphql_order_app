import { ApolloError } from 'apollo-server-core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import appsettings from '../config/appsettings';

export const VerifyUser=(token: string): {email: string, authId: string} | null=>{
    let user :{email: string, authId: string} | null = null;
    try {
        token = token.split(' ')[1];
        const verified = jwt.verify(token,appsettings.authentication.secrete_key!) as { email: string, authId: string};
        console.log(`VERIFIED Credentials is >>> ${JSON.stringify(verified)}`)
        user = verified;
    } catch (errr) {
        throw new ApolloError('Unauthorized- Access denied!')
    }
    return user;
}

export const Encrypt = (name: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(name, salt);
}