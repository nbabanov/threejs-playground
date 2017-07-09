const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const SOURCE_PATH = './src/';
const BUILD_PATH = process.env.BUILD_PATH || path.resolve('./dist/');

const LOCAL_PATH = '/';
const CDN_BASIC = '//mycdn.com/';
const CDN_PATH = CDN_BASIC + 'client/';

const BASE_URL = process.env.BASE_URL || (ENV_PRODUCTION ? '/' : LOCAL_PATH);

module.exports = {
    BUILD_PATH: BUILD_PATH,
    NODE_ENV: NODE_ENV,
    ENV_DEVELOPMENT: ENV_DEVELOPMENT,
    ENV_PRODUCTION: ENV_PRODUCTION,
    ENV_TEST: ENV_TEST,
    SOURCE_PATH: SOURCE_PATH,
    LOCAL_PATH: LOCAL_PATH,
    CDN_BASIC: CDN_BASIC,
    CDN_PATH: CDN_PATH,
    BASE_URL: BASE_URL
};