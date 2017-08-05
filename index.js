import cluster from 'cluster';
import logger from 'yalo-logger';
import config from './src/config';

export default (app) => {
  if (cluster.isMaster) {
    for (let i = 0; i < config.get('WEB_CONCURRENCY'); i++) { // eslint-disable-line no-plusplus
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      logger.warn(`worker ${worker.process.pid} died`);
    });
  } else {
    app.listen(config.get('PORT'), () => {
      logger.info(`The server is running at ${config.get('SCHEME')}://${config.get('HOST')}:${config.get('PORT')}`);
    });
  }

  return app;
};
