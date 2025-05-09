import { Request, Response, NextFunction } from 'express';
  
  export function validateUserBody(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: '이름은 필수입니다.' });
      return;
    }
    next();
  }
