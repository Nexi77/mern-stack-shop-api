import express from 'express';
import log from './utils/logger';
import connect from './utils/connect';
import { envConfig } from '../config/config.env';
import routes from './routes';

const app = express();
const port = envConfig.PORT;
const host = envConfig.HOST;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);
  connect();
  routes(app);
});
