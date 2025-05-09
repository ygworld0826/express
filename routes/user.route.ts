import { Router } from 'express';
  import { getUsers, addUser, deleteUser } from '../controllers/user.controller';
  import { validateUserBody } from '../middlewares/user.middleware';
  
  const router = Router();
  
  // 사용자 목록 가져오기
  router.get('/', getUsers);
  
  // 사용자 추가
  router.post('/', validateUserBody, addUser);
  
  // 사용자 삭제
  router.delete('/:id', (req, res, next) => {
    deleteUser(req, res);
  });
  export default router;
  