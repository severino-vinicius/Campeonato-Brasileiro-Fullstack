import { RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default class TokenValidation {
  static validationToken: RequestHandler = (req, res, next): Response | void => {
    const { authorization } = req.headers;
    const jwtSecret: string = process.env.JWT_SECRET || '';

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const [, token] = authorization.split(' ');
      const validToken = jwt.verify(token, jwtSecret);
      res.locals.user = validToken;
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
