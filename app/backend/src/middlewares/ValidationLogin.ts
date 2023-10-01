import { RequestHandler, Response } from 'express';

export default class Validations {
  static validateLogin: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };
}
