import { Request, Response, NextFunction } from 'express';
import { HTTPStatusCodes } from '../../Gamma.Common/constants/HTTPStatusCodes';
import { HttpError } from '../../Gamma.Common/models/httpError';
//const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";
import { GammaToken } from '../../global';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    console.log("I am a middleware. isAuth");
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4Yzc2MTJmZi00ZDljLTQ4YzMtOTNkZC1iMDhhYTRlM2FhNDUiLCJlbWFpbCI6InMuci5hbGVtQGdtYWlsLmNvbSIsImlhdCI6MTYyNTE1MzQwNSwiZXhwIjoxNjI1MTU3MDA1fQ.6ze9Pad5u3-5sddNax0h0LWqPRVcCjft60QY3VA_e54";
        const token = tempToken//req.headers.authorization.split(' ')[1];
        if (!token) {
            throw (new HttpError('Authentication failed!', HTTPStatusCodes.ClientError.Unauthorized));
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY) as GammaToken;

        req.userData = { userId: decodedToken.userId };

        console.log("decodedToken.userId", decodedToken.userId);
    }
    catch (err) {
        const error = new HttpError('Authentication failed!', HTTPStatusCodes.ClientError.Forbidden);
        return next(error);
    }
    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/login');
    // }
    next();
}