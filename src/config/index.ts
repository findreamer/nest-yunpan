import { readFileSync } from 'fs';
import * as yml from 'js-yaml';
import { join } from 'path';

const configFileMap = {
  development: 'dev',
  test: 'test',
  production: 'prod',
};

const env = process.env.NODE_ENV;
console.log(env);

export default () => {
  return yml.load(
    readFileSync(join(__dirname, `./${configFileMap[env]}.yml`), 'utf8'),
  ) as Record<string, any>;
};
