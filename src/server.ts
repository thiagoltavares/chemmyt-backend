import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';
import './database';

const app = express();
app.use(express.json());

app.use(routes);
app.use('/files', express.static(uploadConfig.diretory));

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('server is running on port 3333 🧨🧨🧨');
});
