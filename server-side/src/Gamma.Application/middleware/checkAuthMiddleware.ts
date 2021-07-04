import { Request, Response, NextFunction } from 'express';
import { HTTPStatusCodes } from '../../Gamma.Common/constants/HTTPStatusCodes';
import { HttpError } from '../../Gamma.Common/models/httpError';
//const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";
import { GammaToken } from '../../global';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw (new HttpError('Authentication failed!', HTTPStatusCodes.ClientError.Unauthorized));
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY) as GammaToken;
        req.userData = decodedToken;

        next();
    }
    catch (err) {
        const error = new HttpError('Authentication failed.(maybe token has been expired)', HTTPStatusCodes.ClientError.Forbidden);
        return next(error);
    }
}