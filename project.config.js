const INPUT_DIR = "src";
const OUTPUT_DIR = "_site";
const CLIENT_DIR = "src/client";
const PATH_PREFIX = '/';
const DIST_DIR = '_site';
const MANIFEST = 'manifest.json';
const INCLUDES = '_includes';
const DATA_DIR = '_data';
const ENTRY_FILE = `${CLIENT_DIR}/main.ts`;
const TEMPLATE_ENGINE = 'njk';

module.exports = {
    INPUT_DIR: INPUT_DIR,
    OUTPUT_DIR: OUTPUT_DIR,
    CLIENT_DIR: CLIENT_DIR,
    PATH_PREFIX: PATH_PREFIX,
    DIST_DIR: DIST_DIR,
    MANIFEST: MANIFEST,
    INCLUDES: INCLUDES,
    DATA_DIR: DATA_DIR,
    ENTRY_FILE: ENTRY_FILE,
    TEMPLATE_ENGINE: TEMPLATE_ENGINE
}