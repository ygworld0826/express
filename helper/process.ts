import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({ input, output });

export async function askToContinue(
  message: string = '\n계속 진행하려면 Enter를 누르세요.'
): Promise<void> {
  const answer = await rl.question(message);
  const proceed = answer.trim() === '' || answer.trim().toLowerCase() === 'y';
  if (!proceed) {
    console.log('사용자에 의해 중단되었습니다.');
    rl.close();
    process.exit(0);
  }
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateAppFile = async () => {
  const filePath = path.join(__dirname, '../app.ts');

  const content = `import express from 'express';

const app = express();
const PORT = 3000;

// JSON 요청을 받을 수 있게 함
app.use(express.json());

// 기본 경로 테스트용
app.get('/', (req, res) => {
  res.send('Express 서버가 정상적으로 실행 중입니다.');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(\`🚀 서버가 실행 중입니다: http://localhost:\${PORT}\`);
});
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${filePath} 파일이 생성되었습니다. 코드를 확인하여 주세요.`);
};

export const generateController = async () => {
  const filePath = path.join(__dirname, '../controllers/user.controller.ts');

  const content = `import { Request, Response } from 'express';
  import * as userService from '../services/user.service';
  
  export const getUsers = (req: Request, res: Response) => {
    const users = userService.getAllUsers();
    res.json(users);
  };
  
  export const addUser = (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '이름은 필수입니다.' });
    }
  
    const user = userService.createUser(name);
    res.status(201).json(user);
  };
  
  export const deleteUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = userService.deleteUserById(id);
  
    if (!deleted) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  
    res.json({ message: \`id \${id}번 사용자가 삭제되었습니다.\` });
  };
  `;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${filePath} 파일이 생성되었습니다. 코드를 확인하여 주세요.`);
};

export const generateRouter = async () => {
  const filePath = path.join(__dirname, '../routes/user.route.ts');

  const content = `import { Router } from 'express';
  import { getUsers, addUser, deleteUser } from '../controllers/user.controller';
  
  const router = Router();
  
  // 사용자 목록 가져오기
  router.get('/', getUsers);
  
  // 사용자 추가
  router.post('/', (req, res, next) => {
    addUser(req, res);
  });
  
  // 사용자 삭제
  router.delete('/:id', (req, res, next) => {
    deleteUser(req, res);
  });
  export default router;

  `;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${filePath} 파일이 생성되었습니다. 코드를 확인하여 주세요.`);
};

export const generateService = async () => {
  const filePath = path.join(__dirname, '../services/user.service.ts');

  const content = `import fs from 'fs';
  import path from 'path';
  
  const DB_PATH = path.join(__dirname, '../db/users.json');
  
  function readUsers() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  }
  
  function writeUsers(users: any[]) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
  }
  
  export function getAllUsers() {
    try {
      return readUsers();
    } catch (error: any) {
      console.log(\`[getAllUsers error] : \${error.message}\`);
    }
  }
  
  export function createUser(name: string) {
    const users = readUsers();
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
    };
    users.push(newUser);
    writeUsers(users);
    return newUser;
  }
  
  export function deleteUserById(id: number) {
    const users = readUsers();
    const index = users.findIndex(
      (u: { id: number; name: string }) => u.id === id
    );
    if (index === -1) return false;
    users.splice(index, 1);
    writeUsers(users);
    return true;
  }
  `;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${filePath} 파일이 생성되었습니다. 코드를 확인하여 주세요.`);
};

export const updateAppFile = async () => {
  const filePath = path.join(__dirname, '../app.ts');

  const content = `import express from 'express';
import userRoutes from './routes/user.route';

const app = express();
const PORT = 3000;

// JSON 요청을 받을 수 있게 함
app.use(express.json());

// user Router
app.use('/users', userRoutes);

// 기본 경로 테스트용
app.get('/', (req, res) => {
  res.send('Express 서버가 정상적으로 실행 중입니다.');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(\`🚀 서버가 실행 중입니다: http://localhost:\${PORT}\`);
});
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${filePath} 파일이 생성되었습니다. 코드를 확인하여 주세요.`);
};
