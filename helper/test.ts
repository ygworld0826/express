import fs from 'fs';
import path from 'path';
import axios from 'axios';

const basePath = path.resolve(__dirname, '../');

export const testFileStruct = async () => {
  const requiredStructure = [
    'helper',
    'routes/user.route.ts',
    'controllers/user.controller.ts',
    'services/user.service.ts',
    'middlewares/auth.middleware.ts',
    'app.ts',
    'package.json',
    'tsconfig.json',
  ];

  try {
    requiredStructure.forEach((relativePath) => {
      const fullPath = path.join(basePath, relativePath);
      const exists = fs.existsSync(fullPath);

      if (!exists) {
        throw new Error(
          `\n❌ ${relativePath} 파일이 없습니다.\n튜토리얼을 마칩니다.`
        );
      }
    });

    console.log('✅ 테스트 통과');
  } catch (err: any) {
    console.log(err.message);
  }
};

export const testAppStart = async () => {
  try {
    const response = await axios.get('http://localhost:3000/');
    console.log(response.data);
    console.log('✅ 테스트 통과');
  } catch (err: any) {
    if (err.errors[0].message.includes('connect ECONNREFUSED ::1:3000')) {
      console.log(
        '\n❌ 서버가 작동하지 않습니다. \n새로운 터미널에서 npm run start 을 실행하여 주세요.'
      );
    }
  }
};

export const testAPI = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');

    if (response.data.length > 0 || response.status === 200) {
      console.log('✅ 테스트 통과');
    } else {
      throw new Error(
        `\n❌ 서버 실행([get] /users)이 실패하였습니다.\n튜토리얼을 마칩니다.`
      );
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
