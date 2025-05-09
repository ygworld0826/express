import express from 'express';
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
  console.log(`🚀 서버가 실행 중입니다: http://localhost:${PORT}`);
});
