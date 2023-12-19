import { IncomingMessage } from 'http';

export const getTokenFromRequest = (req: IncomingMessage): string | null => {
  const authorization = req.headers.authorization;

  const token = authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null;
  return token;
};
