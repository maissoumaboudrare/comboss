import { Context } from 'hono';
import * as model from '../models';

// USAGE : rolesMiddleware(['admin', 'visitor']),
const rolesMiddleware = (requiredRoles: string[]) => {
  return async (c: Context, next: () => Promise<void>) => {
    const userID = c.get('userID') as number;

    const user = await model.getUser(userID);

    if (!user || !user.role || !requiredRoles.includes(user.role)) {
      return c.json({ message: `Forbidden: Requires one of the following roles: ${requiredRoles.join(', ')}` }, 403);
    }

    await next(); 
  };
};

export default rolesMiddleware;