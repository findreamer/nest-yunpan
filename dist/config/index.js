"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yml = require("js-yaml");
const path_1 = require("path");
const configFileMap = {
    development: 'dev',
    test: 'test',
    production: 'prod',
};
const env = process.env.NODE_ENV;
console.log(env);
exports.default = () => {
    return yml.load((0, fs_1.readFileSync)((0, path_1.join)(__dirname, `./${configFileMap[env]}.yml`), 'utf8'));
};
//# sourceMappingURL=index.js.map