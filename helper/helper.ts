import { askToContinue, delay } from './process';

const helper = async () => {
  console.log(
    'Express 실습을 시작합니다. 이번 실습에서는 기본적인 Express 서버를 만들어서 응답을 받아보는 과정을 학습합니다.'
  );
  await askToContinue();

  console.log(
    '\n[Chapter 1. Project 구조] Express는 프레임워크(Framework)입니다.\n프레임워크란, 개발자가 효율적으로 앱이나 소프트웨어를 만들 수 있도록 구조와 규칙이 미리 정의된 도구 또는 틀을 말합니다.\n따라서 Express를 사용할 때는 프레임워크가 요구하는 구조에 맞춰 프로젝트를 구성해야 합니다.\n이는 여러분에게 익숙한 Hardhat의 디렉토리 구조 (예: contracts, test, scripts 등) 와 비슷한 개념입니다.'
  );

  console.log(`\n
  [예시: Hardhat 구조 & Express 구조]
  my-hardhat-contract/
  ├── contracts/
  │   └── MyContract.sol
  ├── test/
  │   ├── MyContract.test.ts
  ├── script/
  │   ├── deploy.ts
  ├── package.json

  my-express-app/
  ├── src/
  │   ├── index.ts      
  │   ├── routes/
  │   └── controllers/
  ├── tsconfig.json
  ├── package.json

  `);

  await askToContinue();
};

helper()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
