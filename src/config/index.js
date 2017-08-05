import fs from 'fs';
import convict from 'convict';
import logger from 'yalo-logger';

const config = convict({
  NODE_ENV: {
    doc: 'Type of enviroment.',
    format: [
      'development',
      'production',
    ],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'node-env',
  },
  CONFIG: {
    doc: 'Config path.',
    format: String,
    default: './config.json',
    env: 'CONFIG',
    arg: 'config',
  },
  WEB_CONCURRENCY: {
    doc: 'Number of workers.',
    format: 'nat',
    default: 1,
    env: 'WEB_CONCURRENCY',
    arg: 'web-concurrency',
  },
  SCHEME: {
    doc: 'Scheme type.',
    format: String,
    default: 'http',
    env: 'SCHEME',
    arg: 'scheme',
  },
  HOST: {
    doc: 'Host name.',
    format: String,
    default: 'localhost',
    env: 'HOST',
    arg: 'host',
  },
  PORT: {
    doc: 'Port number.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
});

fs.access(config.get('CONFIG'), fs.constants.R_OK, (err) => {
  if (err) {
    logger.warn(err);
  }
  else {
    config.loadFile(config.get('CONFIG'));
  }
});

export default config;
