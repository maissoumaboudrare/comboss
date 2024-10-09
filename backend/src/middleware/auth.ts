import { getCookie } from 'hono/cookie';
import * as model from '../models';
import type { Context } from 'hono';

const authMiddleware = async (c: Context, next: () => Promise<void>) => {
  const token = getCookie(c, 'session_token');

  if (!token) {
    return c.json({ message: "User not authenticated" }, 401);
  }

  const session = await model.getSessionByToken(token);

  if (!session || session.userID === null) {
    return c.json({ message: "Invalid session" }, 401);
  }


  c.set('userID', session.userID); 


  await next();
};

export default authMiddleware;