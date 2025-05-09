import { Request, Response } from 'express';
  import * as userService from '../services/user.service';
  
  export const getUsers = (req: Request, res: Response) => {
    const users = userService.getAllUsers();
    res.json(users);
  };
  
  export const addUser = (req: Request, res: Response) => {
    const { name } = req.body;
  
    const user = userService.createUser(name);
    res.status(201).json(user);
  };
  
  export const deleteUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = userService.deleteUserById(id);
  
    if (!deleted) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  
    res.json({ message: `id ${id}번 사용자가 삭제되었습니다.` });
  };
  