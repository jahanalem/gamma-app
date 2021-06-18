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
        const tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoicXl5eUBnbWFpbC5jb20iLCJpYXQiOjE2MjM5NjkxNDUsImV4cCI6MTYyMzk3Mjc0NX0.pDZjM1km5-VWbs-zs7gRH-ayFES8y_6_qymslyrZkm0";
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