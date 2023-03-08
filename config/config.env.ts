import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

interface EnvConfig {
  PORT: number;
  DB_URL: string;
  HOST: string;
  SALT_WORK_FACTOR: number;
  ACCESS_TOKEN_TTL: string;
  REFRESH_TOKEN_TTL: string;
  PRIVATE_KEY: string;
  PUBLIC_KEY: string;
}

export const envConfig: EnvConfig = {
  PORT: Number(process.env.PORT),
  DB_URL: process.env.DB_URL,
  HOST: process.env.HOST,
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
  SALT_WORK_FACTOR: Number(process.env.SALT_WORK_FACTOR),
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
};
