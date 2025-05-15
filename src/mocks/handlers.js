import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:8080/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === 'test@test.com' && password === '1234') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-jwt-token',
          user: { email, name: '홍길동' }
        })
      );
    }
    return res(
      ctx.status(401),
      ctx.json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' })
    );
  }),
];