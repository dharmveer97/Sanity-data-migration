/* eslint-disable no-undef */
import fs from 'fs';
import convict from 'convict';
import dotenv from 'dotenv';

// to load .env file
dotenv.config();

const conf = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  siteName: {
    doc: 'Site Name',
    format: String,
    default: '',
    env: 'SITE_NAME',
  },
  appName: {
    doc: 'App Name',
    format: String,
    default: '',
    env: 'APP_NAME',
  },
  webAppUrl: {
    doc: 'Web app url',
    format: String,
    default: '',
    env: 'WEB_APP_URL',
  },
  // check vercel environment variables
  mongodb: {
    doc: 'URL to mongodb.',
    format: String,
    default: '',
    env: 'MONGODB',
  },
  adminEmail: {
    doc: 'Admin email ',
    format: String,
    default: '',
    env: 'ADMIN_EMAIL',
  },
  jwtSecret: {
    doc: 'JWT secret.',
    format: String,
    default: 'wdwdwdwdwfwefwqwqsas12312312',
    env: 'JWTSECRET',
  },
  sanity: {
    token: {
      doc: 'Sanity token.',
      format: String,
      default: '',
      env: 'SANITY_TOKEN',
    },
    apiVersion: {
      doc: 'Sanity Api Version.',
      format: String,
      default: '2021-03-25',
      env: 'SANITY_API_VERSION',
    },
    dataset: {
      doc: 'Sanity Dataset',
      format: String,
      default: '',
      env: 'SANITY_DATASET',
    },
    projectId: {
      doc: 'Sanity Project ID',
      format: String,
      default: '',
      env: 'SANITY_PROJECT_ID',
    },
  },
  mailer: {
    user: {
      doc: 'Mailer user.',
      format: String,
      default: 'your-id@smtp-brevo.com',
    },
    password: {
      doc: 'Mailer password.',
      format: String,
      default: '',
    },
    host: {
      doc: 'Mailer Host.',
      format: String,
      default: 'smtp-relay.brevo.com', // for Live
      // default: 'smtp-relay.brevo.com', // for Test
      env: 'MAILER_HOST',
    },
  },
  telegram: {
    token: {
      doc: 'Telegram bot URL key',
      format: String,
      default: '',
      env: 'TELEGRAM_BOT',
    },
    chatId: {
      doc: 'Telegram ChatID',
      format: String,
      default: '',
      env: 'TELEGRAM_CHAT_ID',
    },
  },
  aws: {
    bucket: {
      doc: 'S3 Bucket name.',
      format: String,
      default: '',
      env: 'AWS_BUCKET',
    },
    region: {
      doc: 'S3 Region.',
      format: String,
      default: '',
    },
    accessKeyId: {
      doc: 'S3 Access Key Id.',
      format: String,
      default: '',
      env: 'AWS_ACCESS_KEY_ID',
    },
    // check vercel environment variables
    secretAccessKey: {
      doc: 'S3 Secret Access Key.',
      format: String,
      default: '',
      env: 'AWS_SECRET_ACCESS_KEY',
    },
  },
  logdnaKey: {
    doc: 'Logdna Logger Key.',
    format: String,
    default: '',
    env: 'LOGDNA_KEY',
  },
});

const env = conf.get('env');
try {
  const path = `${__dirname}/${env}.json`;

  console.log('trying to access %s', path);
  fs.accessSync(path, fs.F_OK);

  conf.loadFile(path);
} catch (error) {
  console.log("file doesn't exist, loading defaults");
}

conf.validate({ allowed: 'strict' });

export default conf;
