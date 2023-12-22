import dotenv from 'dotenv';
import { Types } from 'mongoose';
dotenv.config();

declare module 'jsonwebtoken' {
  export interface UserForTokenPayload extends JwtPayload {
    username: string,
    id: Types.ObjectId,
  }
}

declare let process: {
  env: {
    PORT: number,
    MONGODB_URI: string,
    SECRET: string,
  }
};

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

export default {
  PORT,
  MONGODB_URI,
  SECRET,
};