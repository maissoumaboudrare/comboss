import { Context } from 'hono';
import * as model from '../models';

const adminMiddleware = async (c: Context, next: () => Promise<void>) => {
  const userID = c.get('userID') as number;

  const user = await model.getUser(userID);
  //TODO Add admin property on user object 
  //* Role dans le token (cookie, session ou lieu plus rapide à lire) (possible et plus rapide mais moins sécure) ex: JWT
  //* Role dans Db session plus lent mais sécure
  if (!user || !user.isAdmin) { // role: userAdmin
    return c.json({ message: "Forbidden: Admins only" }, 403);
  }

  await next(); // authMiddleware, adminMiddleware
};

export default adminMiddleware;