import {
  askToContinue,
  delay,
  generateAppFile,
  generateController,
  generateRouter,
  generateService,
  updateAppFile,
} from './process';
import { testFileStruct, testAppStart, testAPI } from './test';

const helper = async () => {
  console.log(
    'Express 실습을 시작합니다. 이번 실습에서는 기본적인 Express 서버를 만들어서 응답을 받아보는 과정을 학습합니다.'
  );
  await askToContinue();

  console.log(
    '\n\n[Chapter 1. Project 구조] Express는 프레임워크(Framework)입니다.\n프레임워크란, 개발자가 효율적으로 앱이나 소프트웨어를 만들 수 있도록 구조와 규칙이 미리 정의된 도구 또는 틀을 말합니다.\n따라서 Express를 사용할 때는 프레임워크가 요구하는 구조에 맞춰 프로젝트를 구성해야 합니다.\n이는 여러분에게 익숙한 Hardhat의 디렉토리 구조 (예: contracts, test, scripts 등) 와 비슷한 개념입니다.'
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

  console.log(`\n
    우리의 express 프로젝트도 폴더 구조를 만들어보겠습니다. 추가해야 하는 파일만 안내합니다.
    (꼭 다음과 같은 구조를 만들지 않아도 괜찮습니다. 공시 문서를 참고하여 여러분의 구조도 만들어보세요. https://expressjs.com/en/starter/installing.html)

    빈 파일로 만들어주세요.

    express/
    ├── helper/
    │   └── (...이 폴더는 수정하지 않습니다.)
    ├── db/
    │   └── (...이 폴더는 수정하지 않습니다.)
    ├── routes/                          # 라우터 파일 모음
    │   └── user.route.ts
    ├── controllers/                     # 실제 요청 처리 함수들
    │   └── user.controller.ts
    ├── services/                        # 비즈니스 로직 처리
    │   └── user.service.ts
    ├── middlewares/                     # 미들웨어 함수들
    │   └── auth.middleware.ts
    ├── app.ts                           # 서버 진입점
    ├── package.json(기존 파일)
    ├── tsconfig.json(기존 파일)
    ├── (...다른 기존 파일 생략)
    `);

  console.log('폴더 구조 테스트를 진행시겠습니까?');
  await askToContinue();
  await testFileStruct();
  await delay(1000);

  console.log(
    '\n\n[Chapter 2. App.ts] app.ts는 Express 서버의 구성, 라우팅 등록, 미들웨어 설정, 포트 실행까지 모든 핵심 기능을 총괄하는 서버의 본체입니다.'
  );
  console.log('app.ts를 만듭니다.');
  await askToContinue();
  await generateAppFile();

  console.log(
    '\napp.ts가 완료 되었습니다. 현재는 서버를 시작하기 위한 기본적인 구성만 완료가 된 상태입니다.'
  );
  console.log(
    '\n새로운 터미널을 열어 다음의 명령어를 통해 서버를 시작하여 주세요.'
  );
  console.log('npm run start');

  console.log('\n서버가 실행되었는지 테스트를 실행하겠습니다.');

  await askToContinue();
  await testAppStart();

  await delay(1000);

  console.log(
    '\n\n[Chapter 3. Controllers, Routes, Services] Server의 API 실행을 위한 구조'
  );
  console.log(`
    - Controllers : 요청(request)을 받아서, 어떤 처리를 해야 할지 결정하고 응답(response)을 돌려주는 역할
    - Routes : 요청 URL과 HTTP 메서드(GET, POST 등)를 Controller와 연결하는 역할
    - Service : 실제 비즈니스 로직을 처리하는 계층. 데이터 처리, 계산, DB 접근 등이 여기서 일어남

    Controllers, Routes, Services의 역할을 위와 같이 정하고, User와 관련된 API 구현을 진행하겠습니다.
    `);

  console.log('\ncontrollers/user.controller.ts를 만듭니다.');
  await askToContinue();
  await generateController();

  console.log('\nroutes/user.route.ts를 만듭니다.');
  await askToContinue();
  await generateRouter();

  console.log('\nservices/user.sevice.ts를 만듭니다.');
  await askToContinue();
  await generateService();

  console.log('\napp.ts에 user router를 연결하겠습니다. ');
  await askToContinue();
  await updateAppFile();

  await delay(1000);

  console.log(
    '\nUser와 관련된 API 구현이 완료 되었으니 API 테스트를 진행 하겠습니다. '
  );
  await askToContinue();
  await testAPI();

  await delay(1000);

  console.log(
    '\n\n[Chapter 4. Middleware] 요청이 들어오고 나서 최종 응답을 보내기 전에 어떤 작업을 하는 함수'
  );
};

helper()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
