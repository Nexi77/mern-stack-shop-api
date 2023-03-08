import { connect as mongooseConnect } from 'mongoose';
import logger from './logger';

async function connect() {
  const dbUri = process.env.DB_URL;

  try {
    await mongooseConnect(dbUri);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
