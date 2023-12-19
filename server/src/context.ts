import User from './models/user';
import jwt from 'jsonwebtoken';
import config from './utils/config';
import { GraphQLError } from 'graphql';
import { IncomingMessage } from 'http';

const getTokenFromRequest = (req: IncomingMessage): string | null => {
  const authorization = req.headers.authorization;

  const token = authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null;
  return token;
};

export const getUserFromRequest = async (req: IncomingMessage) => {
  const token = getTokenFromRequest(req);

  try {
    if (token) {
      const decodedToken = <jwt.UserForTokenPayload>jwt.verify(token, config.SECRET);
      if (decodedToken.id) {
        const user = await User.findById(decodedToken.id);
        return user;
      }
    }
    return null;
  } catch (error) {
    throw new GraphQLError('invalid token', {
      extensions: {
        code: 'BAD_USER_INPUT',
        error
      }
    });
  }
};

const context = async ({ req }: { req: IncomingMessage }) => ({
  user: await getUserFromRequest(req)
});

export default context;